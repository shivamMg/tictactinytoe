F = _ => {
  x = o = z = 0
  t = 1
}
F()

require("net").createServer(c => {
  w = s => c.write(s+"\n")
  if (z > 1)
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
    l = []
    for (i = 1; i <= 9; i++) {
      l.push(i in x.m ? "X" : o && i in o.m ? "O" : i)
      if (i % 3 == 0) {
        e.w(l.join("|"))
        l = []
      }
    }
  }
  G(c)

  c.on("end", _ => c.W("Player left")
  ).on("data", d => {
    if (t ^ c == x)
      return
    v = parseInt(d)
    if (isNaN(v) || v<1 || v>9 || v in {...x.m, ...o.m})
      return c.w("Invalid move")
    c.m[v] = 1
    t = 1 - t
    f = i => i < 24 ? "123147159369789753258456".slice(i, i+3).split("").every(j => j in c.m) || f(i+3) : 0
    if (f(0)) {
      c.w("You won")
      throw c.W("You lost")
    }
    if (z > 9) {
      r = "Draw"
      c.w(r)
      throw c.W(r)
    }
    G(x)
    o && G(o)
    z++
  })
}).listen(9191)

process.on('uncaughtException', F)
