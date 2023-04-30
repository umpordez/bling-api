Sportmonks API 3.0
===============

[![sheriff](https://github.com/umpordez/sportmonks3/actions/workflows/sheriff.yml/badge.svg)](https://github.com/umpordez/sportmonks3/actions/workflows/sheriff.yml)
[![NPM](https://nodei.co/npm/sportmonks3.png?mini=true)](https://nodei.co/npm/sportmonks3)

---

This is an implementation of all endpoints available in the SportMonks 3.0 API

- https://docs.sportmonks.com/football2/getting-started/welcome


## Simple usage:

```
const Sportmonks = require('sportmonks3');
const sm = new Sportmonks(yourApiToken);

// now you have all endpoints available here:
console.log(sm.football);
console.log(sm.odds);
console.log(sm.cre);
```
