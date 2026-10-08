const flavors = {
  watermelon: { number:'01', name:'WATERMELON<br>STATIC', description:'Juicy watermelon with a zingy sour spark. Like summer turned up way too loud.', color:'#d4ff43', meter:'● ● ● ● ○', note:'SOUR SPARK' },
  berry: { number:'02', name:'BERRY<br>BIG IDEAS', description:'A bold burst of blueberry and raspberry. Sweet, a little unexpected, and impossible to ignore.', color:'#bfacff', meter:'● ● ● ● ●', note:'BERRY BOLD' },
  citrus: { number:'03', name:'CITRUS<br>SHORT CIRCUIT', description:'Electric lemon meets tangy orange. A bright little jolt for your taste buds.', color:'#ffae47', meter:'● ● ● ○ ○', note:'TANGY TWIST' }
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectFlavor(tab) {
  const flavor = flavors[tab.dataset.flavor];
  tabs.forEach(item => { item.setAttribute('aria-selected', String(item === tab)); item.tabIndex = item === tab ? 0 : -1; });
  const panel = document.querySelector('#flavor-panel');
  panel.setAttribute('aria-labelledby', tab.id); panel.style.backgroundColor = flavor.color;
  document.querySelector('#flavor-number').textContent = 'FLAVOR ' + flavor.number;
  document.querySelector('#flavor-name').innerHTML = flavor.name;
  document.querySelector('#flavor-description').textContent = flavor.description;
  document.querySelector('#flavor-meter').textContent = flavor.meter;
  document.querySelector('#flavor-note').textContent = flavor.note;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFlavor(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if(event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if(event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if(event.key === 'Home') next = 0;
    if(event.key === 'End') next = tabs.length - 1;
    if(next !== undefined) { event.preventDefault(); selectFlavor(tabs[next]); tabs[next].focus(); }
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
