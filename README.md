# dice-cli

This is a command line interface for the [rpg-dice-roller](https://github.com/dice-roller/rpg-dice-roller) library.

They have their own [general CLI](https://github.com/dice-roller/cli) but I wanted to make one that was more tailored to my needs.

## Differences

Theirs
- Instantiate script for each roll
- Format result as "[Notation]: [Rolls] = [Result]"
```console
> roller 2d20kh1+5
2d20kh1+5: [18d, 20]+5 = 25
> roller 1d20+2
1d20+2: [13]+2 = 15
> roller 2d6+4
2d6+4: [1, 4]+4 = 9
```

Mine:
- Instantiate script once, then roll multiple times
- Format result as "[Result] <== [Rolls]"
- Colorize the output (bold for result, green for max rolls, red for min rolls)
```console
> npm start
...
> 2d20kh1+5
  25 <== [18d, 20]+5
> 1d20+2
  15 <== [13]+2
> 2d6+4
  9 <== [1, 4]+4
```

![OutputColors](readme_images/OutputColors.png)
