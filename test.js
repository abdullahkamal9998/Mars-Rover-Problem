const directions = {
  NORTH: {
    L: "WEST",
    R: "EAST",
  },
  SOUTH: {
    L: "EAST",
    R: "WEST",
  },
  EAST: {
    L: "NORTH",
    R: "SOUTH",
  },
  WEST: {
    L: "SOUTH",
    R: "NORTH",
  },
};

const movement = {
  NORTH: {
    F: 1,
    B: -1,
  },
  SOUTH: {
    F: -1,
    B: 1,
  },
  EAST: {
    F: 1,
    B: -1,
  },
  WEST: {
    F: -1,
    B: 1,
  },
};

function test(initialState, command, obstacles) {
  let { direction, xAxis, yAxis } = initialState;
  for (let i = 0; i < command.length; i++) {
    let xBoolean = true;
    let stop = false;
    if (command[i] === "L" || command[i] === "R") {
      direction = directions[direction][command[i]];
      continue;
    }
    if (direction === "NORTH" || direction === "SOUTH") {
      yAxis += movement[direction][command[i]];
      xBoolean = false;
    } else {
      xAxis += movement[direction][command[i]];
      xBoolean = true;
    }
    for (let j = 0; j < obstacles.length; j++) {
      if (obstacles[j][0] === xAxis && obstacles[j][1] === yAxis) {
        stop = true;
        if (xBoolean) {
          xAxis -= movement[direction][command[i]];
        } else {
          yAxis -= movement[direction][command[i]];
        }
        break;
      }
    }
    console.log(`(${xAxis}, ${yAxis}, ${direction})`);
    if (stop) {
      direction = direction + " STOPPED";
      break;
    }
  }
  alert(`(${xAxis}, ${yAxis}, ${direction})`);
  console.log("---------------------------------------------");
}

test({ xAxis: 4, yAxis: 2, direction: "EAST" }, "FLFFFRFLB", [
  [1, 4],
  [3, 5],
  [7, 4],
]); // clear test
test({ xAxis: 4, yAxis: 2, direction: "WEST" }, "FLFFFRFLB", [
  [1, 4],
  [5, 3],
  [7, 4],
]); // clear test

test({ xAxis: 4, yAxis: 2, direction: "EAST" }, "FLFFFRFLB", [
  [1, 4],
  [5, 3],
  [7, 4],
]); // stop test
test({ xAxis: 4, yAxis: 2, direction: "WEST" }, "FLFFFRFLB", [
  [1, 4],
  [2, 0],
  [7, 4],
]); // clear test
