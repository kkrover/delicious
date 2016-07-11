#!/bin/bash

mongoimport --jsonArray --drop --db $DB --collection bookmarks --file ../data/bookmarks.json
