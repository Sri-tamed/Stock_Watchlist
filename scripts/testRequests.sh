#!/bin/bash

BASE_URL="http://localhost:5000/api"

echo "--- Test Case 1: Add a valid stock (AAPL) ---"
curl -X POST -H "Content-Type: application/json" -d '{"name": "AAPL"}' $BASE_URL/add
echo "\nExpected: { success: true, data: { name: 'AAPL', ... } } (Status 201)"

echo "\n\n--- Test Case 2: Add an invalid stock (apple123) ---"
curl -X POST -H "Content-Type: application/json" -d '{"name": "apple123"}' $BASE_URL/add
echo "\nExpected: { success: false, error: 'Stock ticker must be 1-5 uppercase letters.' } (Status 400)"

echo "\n\n--- Test Case 3: Add a duplicate stock (AAPL) ---"
curl -X POST -H "Content-Type: application/json" -d '{"name": "AAPL"}' $BASE_URL/add
echo "\nExpected: { success: false, error: 'Stock ticker already exists in the watchlist.' } (Status 409)"

echo "\n\n--- Test Case 4: Get the watchlist ---"
curl $BASE_URL/watchlist
echo "\nExpected: { success: true, data: [ { name: 'AAPL', ... } ] }"

echo "\n\n--- Test Case 5: Add an empty input ---"
curl -X POST -H "Content-Type: application/json" -d '{"name": ""}' $BASE_URL/add
echo "\nExpected: { success: false, error: 'Stock ticker cannot be empty.' } (Status 400)"

echo "\n"
