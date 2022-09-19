/* MarqueeTitle v4.0 | MIT License | git.io/vQZbs */
(function(c, a, m) {
    var title = (c || document.title) + " " + (a || "-") + " ";
    setInterval(function() {
      title = title.substring(1) + title.charAt(0);
      document.title = title;
    }, m || 300);
  })(
    /* Tab Text */ "Bienvenido al club Cyberia, a bailar se ha dicho",
    /* Title Repeat Separator */ "|",
    /* Scroll Speed (in milleseconds) */ 300
  );