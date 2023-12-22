---
title: Mocking http requests with Go
date: 2023-12-21T12:36:41-08:00
draft: false
author: Alex Fallenstedt
annotations: false
---

I used to rely on dependency injection and interfaces to mock my http clients. This worked, but was very burdensome. I learned about the [`httptest`](https://pkg.go.dev/net/http/httptest) package which provides utilities for HTTP testing. I'll walk through an example test I made in my [weather CLI](https://github.com/Fallenstedt/go-weather)

# The code which makes a network request

I ping NOAA for a weather forecast using the following code. I have a `FetchForecast` method which invokes `fetch` to perform the network request at a specific URL.

```go
package weather


type Weather struct {
    forecastUrl string
}

func (w *Weather) FetchForecast() ([]Forecast, error) {
	var fr forecastReponse
	err := w.fetch(w.forecastUrl, &fr)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response, %w", err)
	}

	return fr.Properties.Periods, nil
}

func (w *Weather) fetch(url string, unmarshal interface{}) error {
	resp, err := http.Get(url)
	if err != nil {
		return fmt.Errorf("%w, %w", ErrFetchForecast, err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("%w, got status %d", ErrFetchForecast, resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(body, unmarshal)
	if err != nil {
		return fmt.Errorf("failed to unmarshal response, %w", err)
	}

	return nil
}

```

Writing a test for this is easy. You can use set up a mock server with httptest, and supply a URL to that server. Here is an example test where I supply a mock response from NOAA using a testing server. My code will make a GET request to this server, and receive code.

```go
package weather_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Fallenstedt/weather/common/weather"
)


func TestFetchForcast(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte(`{
			foo: "bar" // Mock JSON goes here
		}`))
	})) // create an http test server which responds with some JSON
	defer server.Close() // close the server at the end of the test

	w := weather.Weather{ForecastUrl: server.URL} // supply a server url

	_, err := w.FetchForecast() // fetch data from the httptest server

	if err != nil {
		t.Errorf("Found error: %v", err)
	}

    //... add more test expectations here
}

```
