let p = {
  a: 'a'
}

let handler = {
  set(target, key, value, receiver) {
    console.log('set');
    Reflect.set(target, key, value);
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty');
    Reflect.defineProperty(target, key, attribute);
  }
}

let pro = new Proxy(p, handler);

pro.a = 'haha';

console.log(p, pro);
