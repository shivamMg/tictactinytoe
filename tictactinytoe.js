F = _ => {
  x = o = z = 0
  t = 1
}
F()

require("net").createServer(c => {
  h = "\n"
  w = s => c.write(s+h)
  if (o)
    return w("Game in progress")

  c.m = {}
  c.w = w
  if (z) {
    o = c
    o.W = x.w
    x.W = w
  } else {
    x = c
  }
  z++

  G = (e) => {
    for (l = "", i = 1; i <= 9; i++)
      l += i in x.m ? "X" : o && i in o.m ? "O" : i, l += i % 3 ? "|" : h
    e.w(l)
  }
  G(c)

  c.on("end", _ => c.W("Player left")
  ).on("data", d => {
    if (t ^ c == x)
      return
    v = parseInt(d)
    if (isNaN(v) || v<1 || v>9 || v in {...x.m, ...o.m})
      return c.w("Invalid move")
    t = c.m[v] = 1 - t
    G(x)
    o && G(o)
    f = i => i < 24 ? "123147159369789753258456".slice(i, i+3).split("").every(j => j in c.m) || f(i+3) : 0
    if (f(0))
      throw c.w("You won"), c.W("You lost")
    if (z++ > 9)
      throw r = "Draw", c.w(r), c.W(r)
  })
}).listen(9191)

process.on('uncaughtException', F)
