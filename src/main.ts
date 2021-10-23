function showTime() {
  // eslint-disable-next-line no-console
  console.log(Date().toLocaleString());
}

function tick() {
  setTimeout(() => {
    showTime();
    tick();
  }, 1000);
}

tick();
