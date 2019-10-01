---
title: Compute With Flutter
description: Parsing large amounts of JSON efficiently is easy with Flutter's compute method. Learn how to prevent jank by spawning isolates.
tags: ["performance", "dart"]
date: 2019-09-29
draft: false
---

Dart is a single threaded language, but it comes with a handy [compute](https://api.flutter.dev/flutter/foundation/compute.html) function to spawn isolates. In a nutshell, the compute function is useful for doing extra work on a different "thread"--it's actually an isolate--so your flutter app does not experience "jank". Jank occurs when the UI doesn’t render smoothly. For example, every so often, a frame takes 10 times longer to render, so it gets dropped, and the animation visibly jerks.

To use compute, you need a function and data. `compute` will return a future of whatever your function returns.

```dart
final Future<R> result = compute(someFunction, someData)
```

In my app, I had to parse about 200 tweets that were scored with sentiment analysis. Each tweet has a `message` and `created` property, but the `sentiment` property had some intense parsing. So when I created a new `TweetDto`, I also had to create a new `SentimentDto`.

```dart
class TweetDto {
  final int id;
  final String message;
  final String created;
  final SentimentDto sentiment;

  TweetDto({
    @required this.id,
    @required this.message,
    @required this.created,
    @required this.sentiment,
  });

  factory TweetDto.fromJson(Map<String, dynamic> json) {
    return TweetDto(
      id: json['id'],
      message: json['message'],
      created: json['created'],
      sentiment: SentimentDto.fromJson(json['sentiment']),
    );
  }
}
```

```dart

class SentimentDto {
  final List<_SentimentSentence> sentences;
  final _SentimentSummary documentSentiment;
  final String language;

  SentimentDto({
    @required this.sentences,
    @required this.documentSentiment,
    @required this.language,
  });

  factory SentimentDto.fromJson(Map<String, dynamic> json) {
    final List<dynamic> sentencesRef = json['sentences'];
    final List<_SentimentSentence> sentences = List<_SentimentSentence>.from(
      sentencesRef.map(
        (s) => _SentimentSentence(
          text: _SentimentText(
            content: s['text']['content'],
            beginOffset: (s['text']['beginOffset']).toDouble(),
          ),
          sentiment: _SentimentSummary(
            score: (s['sentiment']['score']).toDouble(),
            magnitude: (s['sentiment']['magnitude']).toDouble(),
          ),
        ),
      ),
    );
    final documentSentiment = _SentimentSummary(
      score: (json['documentSentiment']['score']).toDouble(),
      magnitude: (json['documentSentiment']['magnitude']).toDouble(),
    );
    final language = json['language'];

    return SentimentDto(
      sentences: sentences,
      documentSentiment: documentSentiment,
      language: language,
    );
  }
}

class _SentimentSentence {
  final _SentimentText text;
  final _SentimentSummary sentiment;

  _SentimentSentence({
    @required this.text,
    @required this.sentiment,
  })  : assert(text != null),
        assert(sentiment != null);
}

class _SentimentText {
  final String content;
  final double beginOffset;

  _SentimentText({
    @required this.content,
    @required this.beginOffset,
  });
}

class _SentimentSummary {
  final double magnitude;
  final double score;

  _SentimentSummary({
    @required this.magnitude,
    @required this.score,
  })  : assert(magnitude != null),
        assert(score != null);
}

```

I experienced some performance when I was parsing about 200 tweets each with their own sentiment score, so I looked to compute all of this json parsing with Flutter's `compute`. In my TweetBloc, I had a function called `loadTweets` which was responsible for fetching 200 scored tweets. You'll see that I switch to new Observable with `Observable.fromFuture(...)` in order to keep this operation reactive.

```dart
...
 void loadTweets() {
    _authService
        .get(ApiConsts.getTweets(200))
        .switchMap((signal) => Observable.fromFuture(
            compute(TweetBloc._decodeAndParseTweets, signal.body)))
        .take(1)
        .listen(
      (List<TweetDto> signal) {
        _tweets.add(signal);
      },
    );
  }

..
```

Because compute takes a function that performs the computation, I created a static function `decodeAndParseTweets` which parses all of my json.

```dart
 void loadTweets() {
    _authService
        .get(ApiConsts.getTweets(200))
        .switchMap((signal) => Observable.fromFuture(
            compute(TweetBloc._decodeAndParseTweets, signal.body)))
        .take(1)
        .listen(
      (List<TweetDto> signal) {
        _tweets.add(signal);
      },
    );
  }

  static List<TweetDto> _decodeAndParseTweets(String jsonBody) {
    final List<dynamic> decodedJson = jsonDecode(jsonBody);
    final List<TweetDto> tweets =
        decodedJson.map((t) => TweetDto.fromJson(t)).toList();
    return tweets;
  }
```

Flutter's `compute` helped prevent jank in my flutter app by offloading intense parsing of data onto a new isolate. Consider using it in the future when you have any intense data processing.
