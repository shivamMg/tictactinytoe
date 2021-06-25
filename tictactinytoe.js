net = 

x = o = x_in_game = 0;
t = 1;
winning_triplets = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [3, 6, 9],
  [7, 8, 9],
  [7, 5, 3],
  [2, 5, 8],
  [4, 5, 6],
]


require("net").createServer(c => {
  c.w = s => c.write(s+"\n")
  if (x && o)
    return c.w("Game in progress")

  c.m = [];
  if (x_in_game) {
    o = c
    o.c = x
    x.c = o
  } else {
    x = c
    x_in_game = 1
  }

  G = (c) => {
    line = [];
    for (i = 1; i <= 9; i++) {
      if (x.m.includes(i))
        line.push("X");
      else if (o && o.m.includes(i))
        line.push("O");
      else
        line.push(""+i);
      if (i % 3 == 0) {
        c.w(line.join("|"));
        line = [];
      }
    }
  }
  G(c)

  c.on("end", () => c.c.write("Player left")
  ).on("data", d => {
    if (t ^ c == x)
      return c.w("Not your turn");
    v = parseInt(d);
    if (isNaN(v) || v<1 || v>9 || x.m.concat(o.m).includes(v))
      return c.w("Invalid move");
    c.m.push(v);
    t = 1 - t;
    won = winning_triplets.some(triplet =>
      triplet.every(j => c.m.includes(j))
    );
    if (won) {
      c.w("You won");
      c.c.w("You lost");
    }
    if (x.m.length + o.m.length == 9) {
      m = "Draw"
      x.w(m);
      o.w(m);
    }
    G(x);
    G(o);
  });
}).listen(9191);
