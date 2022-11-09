---
title: Streaming Tweets With Go
date: 2021-12-29T12:36:41-08:00
lastmod: 2022-11-07T12:36:41-08:00
draft: false
author: Alex Fallenstedt
---

## Update
> This repo is read-only and is no longer worked on. Twitter was a wonderful platform, built by a wonderful team. With its recent changes, its time to re-evaluate what we invest in and the world we want to build. To the projects using this library, I'll leave the repo read-only so you can migrate on your own time

Building with free APIs is a great way to teach yourself new skills in languages you like. I’ve always found APIs as an underrated way to learn something new. Building with APIs brings challenges that force you to learn new parts of programming that video tutorials can not do.

Twitter’s API’s filtered stream endpoint allows you to filter the real-time stream of public Tweets. You can tap into twitter discussions by filtering tweets for specific attributes. You can find the latest job postings, monitor weather events, or keep on top of trends.

In this article I will discuss how to create twitter rules and manage a stream with my open source library [`twitterstream`](https://github.com/Fallenstedt/twitter-stream). This library was built for my project [findtechjobs](https://findtechjobs.io) so I could find the latest tech jobs posted on twitter.

If you want a complete code example to get started, head over to the examples on [twitterstream](https://github.com/Fallenstedt/twitter-stream/tree/master/example)

![twitter phone](https://images.unsplash.com/photo-1622920156895-96dd15c40f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80)

## Where do I start?

The first step is to create an app on [Twitter Developers](https://developer.twitter.com/) and obtain a set of consumer keys. One you have an API key and an API secret key, you can generate an access token with `twitterstream`

## Generate an Access Token

We can use `twitterstream` to generate an access token. This access token will be used to authenticate all network requests going forward. In the code below, we make a network request to twitter’s [oauth2/token endpoint](https://api.twitter.com/oauth2/token) with the The 'Basic' HTTP Authentication Scheme. Then we create an instance of `twitterstream` with our access token.

```go
	tok, err := twitterstream.NewTokenGenerator().SetApiKeyAndSecret("YOUR_KEY", "YOUR_SECRET_KEY").RequestBearerToken()
// Create an instance of twitter api
	api := twitterstream.NewTwitterStream(tok.AccessToken)

```

## Set up Streaming Rules

Streaming rules make your stream deliver relevant information. The rules match a variety of twitter attributes such as message keywords, hashtags, and URLs. Creating great rules is fundamental to having a successful twitter stream. It’s important to continue refining your rules as you stream so you can harvest relevant information.

Let’s create a stream for software engineer job postings with `twitterstream`. A valid job posting tweet should should be:

- Posted in the english language
- Not a retweet
- Not a reply to another tweet
- Contain the word “hiring”
- And contain the words “software developer” or “software engineer”

The `twitterstream` package makes building rules easy. We can use a `NewRuleBuilder` to create as many rules as the Twitter API allows for our consumer keys.

```go
rules := twitterstream.NewRuleBuilder().
		AddRule("lang:en -is:retweet -is:quote hiring (software developer OR software engineer)", "hiring software role").
            Build()

res, err := api.Rules.Create(rules, false)
```

The first part is using `twitterstream` to create a `NewRuleBuilder`.

We pass in two arguments when we add our rule with `AddRule`. The first is a long string with many operators. Successive operators with a space between them will result in boolean "AND" logic, meaning that Tweets will match only if both conditions are met. For example `cats dogs` will match tweets that contain the words “cats” and “dogs”. The second argument for `AddRule` is the tag label. This is a free-form text you can use to identify the rules that matched a specific Tweet in the streaming response. Tags can be the same across rules.

Let’s focus on the first argument. Each operator does something unique:

- The first is the single `lang:en` which is BCP 47 language identifier. This filters the stream for tweets posted in the English language. You can only use a single lang operator in a rule, and it must be used with a conjunction.

- Then we exclude retweets with `-is:retweet`. We use NOT logic (negation) by including a minus sign in front of our operator. The negation can be applied to words too. For example, `cat #meme -grumpy` will match tweets with the word cat, #meme, and do not include the word “grumpy”.

- We also exclude quote tweets with `-is:quote`. Quote tweets are tweets with comments, and I’ve found this operator very useful. When I was building findtechjobs.io, I encountered a lot of people retweeting an article about automated hiring with their opinion. These quote tweets cluttered my dataset with unrelated job postings.

- I then narrow my stream of tweets to words that include `hiring`. People who tweet about jobs would say “My team is hiring…”, or “StartupCo is hiring…”.

- Finally `(software developer OR software engineer)`, is a grouping of operators combined with an OR logic. Tweets will match if the tweet contains either of these words.

After we build our rules, we create them with `api.Rules.Create`. If you want to delete your rules, you can use `api.Rules.Delete` with the ID of each rule you currently have. You can find your current rules with `api.Rules.Get`.

You can learn more about [rule operators here](https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/integrate/build-a-rule). Additionally, the endpoint that creates the rules is [documented here](https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/post-tweets-search-stream-rules).

## Set the Unmarshal Hook

We need to create our own struct for our tweets so we can unmarshal the tweet well. Twitter’s Filtered Stream endpoint allows us to fetch additional information for each tweet (more on this later). To allow us to find this data easily, we need to create a struct that will represent our data model.

```go
type StreamDataExample struct {
    Data struct {
        Text      string    `json:"text"`
        ID        string    `json:"id"`
        CreatedAt time.Time `json:"created_at"`
        AuthorID  string    `json:"author_id"`
    } `json:"data"`
    Includes struct {
        Users []struct {
        ID       string `json:"id"`
        Name     string `json:"name"`
        Username string `json:"username"`
        } `json:"users"`
    } `json:"includes"`
    MatchingRules []struct {
        ID  string `json:"id"`
        Tag string `json:"tag"`
    } `json:"matching_rules"`
}
```

Every tweet that is streamed is returned as a `[]bytes` by default. We can turn our data into something usable by unmarshaling each tweet into the struct `StreamDataExample`. It’s important to set an unmarshal hook with `SetUnmarshalHook` so we can process `[]bytes` in a goroutine safe way.

```go
api.SetUnmarshalHook(func(bytes []byte) (interface{}, error) {
    data := StreamDataExample{}

    if err := json.Unmarshal(bytes, &data); err != nil {
        fmt.Printf("failed to unmarshal bytes: %v", err)
    }

    return data, err
})
```

If you are uncertain what your data model will look like, you can always create a string from the slice of bytes.

```go
api.SetUnmarshalHook(func(bytes []byte) (interface{}, error) {
	return string(bytes), nil
})
```

## Starting a Stream

After creating our streaming rules and unmarshal hook, we are ready to start streaming tweets.
By default, twitter returns a limited amount of information about each tweet when we stream. We can request additional information on each tweet with a stream expansion.

```go
    streamExpansions := twitterstream.NewStreamQueryParamsBuilder().
        AddExpansion("author_id").
        AddTweetField("created_at").
        Build()

    // StartStream will start the stream
    err = api.StartStream(streamExpansions)
```

We first create some stream expansions with a `NewStreamQueryParamsBuilder`. This builder will create query parameters to start our stream with. Here, we are adding two additional piece of information to each tweet

- `AddExpansion("author_id")` will request the author’s id for each tweet streamed. This is useful if you are keeping track of users who are tweeting.
- ` AddTweetField("created_at")` will request the time the tweet was tweeted. This is useful if you need to sort tweets chronologically.
  You can learn more about the available [stream expansions here](https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream)

Then we start the stream with our expansions using `api.StartStream`. This method will start a long running GET request to twitter’s streaming endpoint. The request is parsed incrementally throughout the duration of the network request. If you are interested in learning more about how to consume streaming data from twitter, then you should read their documentation [Consuming Streaming Data](https://developer.twitter.com/en/docs/tutorials/consuming-streaming-data.)

## Consuming the Stream

Each tweet that is processed in our long running GET request is sent to a go channel. We `range` over this channel to process each tweet and check for errors from twitter. The stream will stop when we invoke `api.StopStream`, then we skip the remaining part of the loop, return to the top and wait for a`close` signal from the channel.

```go
   // Start processing data from twitter after starting the stream
    for tweet := range api.GetMessages() {

        // Handle disconnections from twitter
        if tweet.Err != nil {
            fmt.Printf("got error from twitter: %v", tweet.Err)

            // Stop the stream and wait for the channel to close on the next iteration.
            api.StopStream()
            continue
        }
        result := tweet.Data.(StreamDataExample)

        // Here I am printing out the text.
        // You can send this off to a queue for processing.
        // Or do your processing here in the loop
        fmt.Println(result.Data.Text)
    }
```

Twitter’s servers attempt to hold the stream connection indefinitely. The error from twitter is made available in the stream. Disconnections can occur from several possible reasons:

- A streaming server is restarted on the Twitter side. This is usually related to a code deploy and should be generally expected and designed around.
- Your account exceeded your daily/monthly quota of Tweets.
- You have too many active redundant connections.
- [More disconnect reasons can be found here](https://developer.twitter.com/en/docs/twitter-api/tweets/volume-streams/integrate/handling-disconnections)

## Anticipating Disconnects from Twitter

It’s important to maintain the connection to Twitter as long as possible because missing relevant information in your stream can create poor datasets. It should be expected that disconnections will occur and reconnection logic be built to handle disconnections from twitter

We can build reconnection logic using `twitterstream`’s api and a `defer` statement. [A full example of handling reconnects can be found here](https://github.com/Fallenstedt/twitterstream/blob/master/example/stream_forever.go). Below is a snippet

```go
// This will run forever
func initiateStream() {
	fmt.Println("Starting Stream")

    // Start the stream
	// And return the library's api
	api := fetchTweets()

	// When the loop below ends, restart the stream defer initiateStream()
    defer initateStream()

	// Start processing data from twitter
	for tweet := range api.GetMessages() {
		if tweet.Err != nil {

			fmt.Printf("got error from twitter: %v", tweet.Err)

			api.StopStream()
			continue
		}
		result := tweet.Data.(StreamDataExample)
		fmt.Println(result.Data.Text)
	}
	fmt.Println("Stopped Stream")
}

```

After we have started the stream and before we start processing the tweets, we `defer` the method itself. This will handle reconnections to twitter whenever the messages channel closes.

## Final Thoughts

I hope you find this library useful in streaming tweets from twitter. Building this library was a challenge, and I learned how Go’s concurrency model works. If you liked this post, follow me on [mastodon](https://indieweb.social/@Fallenstedt) as I document my journey in the software world.
