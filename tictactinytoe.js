C = []

p = c => {
  h = "\n"
  w = s => c.write(s+h)
  if (o)
    return w("Game in progress")
  
  if (!C.includes(c)) C.push(c)

  c.m = {}
  c.w = w
  z++ ? (o = c, o.W = x.w, x.W = w) : x = c

  G = (e) => {
    for (l = "", i = 1; i <= 9; i++)
      l += i in x.m ? "X" : o && i in o.m ? "O" : i, l += i % 3 ? "|" : h
    e.w(l)
  }
  G(c)

  c.on("end", _ => {
    c.W("Player left")
    C = C.filter(l => c !== l)
  }).on("data", d => {
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
      throw c.w("You won"+h), c.W("You lost"+h)
    if (z++ > 9)
      throw r = "Draw"+h, c.w(r), c.W(r)
  })
}

T = 0

F = _ => {
  x = o = z = 0
  t = !T
  T = t
  C.map(p)
}
F()

require("net").createServer(p).listen(9191)

process.on('uncaughtException', F)
