import './cube.css';
import { rotate } from './cube';

const but_cont = document.getElementById('but_cont');
const but_cont_back = document.getElementById('but_cont_back');

function createRotateButton(rotName, forward) {
  const button = document.createElement('div');
  button.id = rotName;
  if (forward) button.id += '-back';
  button.id += '_rotate';
  button.className = 'rotate_button';
  button.addEventListener('click', function () {
    rotate(rotName + (forward ? "'" : ''));
  });

  let title = rotName.toUpperCase();
  if (forward) title += "'";
  button.innerHTML = title;

  if (forward) {
    but_cont_back.appendChild(button);
  } else {
    but_cont.appendChild(button);
  }
}

const buttonNames = ['f', 'l', 'u', 'x', 'y', 'z'];

for (let index = 0; index < buttonNames.length; index++) {
  createRotateButton(buttonNames[index]);
  createRotateButton(buttonNames[index], true);
}
