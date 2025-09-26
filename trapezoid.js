function getTrapezoidPath(w, h, dtt, r) {

    const dt = dtt * h / 2;

    // corner coordinates
    const x0 = 0, y0 = 0;
    const x1 = w, y1 = dt;
    const x2 = w, y2 = h - dt;
    const x3 = 0, y3 = h;

    const v01x = x1 - x0, v01y = y1 - y0, lv01 = Math.sqrt(v01x ** 2 + v01y ** 2);
    const v32x = x3 - x2, v32y = y3 - y2, lv32 = Math.sqrt(v32x ** 2 + v32y ** 2);

    // rounded points coordinates
    const x0a = x0, y0a = y0 + r;
    const x0b = x0 + (v01x / lv01) * r, y0b = y0 + (v01y / lv01) * r;

    const x1a = x1 - (v01x / lv01) * r, y1a = y1 - (v01y / lv01) * r;
    const x1b = x1, y1b = y1 + r;

    const x2a = x2, y2a = y2 - r;
    const x2b = x2 + (v32x / lv32) * r, y2b = y2 + (v32y / lv32) * r;

    const x3a = x3 - (v32x / lv32) * r, y3a = y3 - (v32y / lv32) * r;
    const x3b = x3, y3b = y3 - r;

    const d = `
        m${x0a},${y0a}
        Q${x0},${y0}, ${x0b}, ${y0b}
            
        L${x1a},${y1a}
        Q${x1},${y1}, ${x1b}, ${y1b}
            
        L${x2a},${y2a}
        Q${x2},${y2}, ${x2b}, ${y2b}
            
        L${x3a},${y3a}
        Q${x3},${y3}, ${x3b}, ${y3b}

        Z 
    `

    return d;
}

const svg = document.getElementById('svgTrapezoid');
const path = svg.querySelector('path');

const el_width  = document.getElementById('Width');
const label_width = document.getElementById('LabelWidth').firstChild;

const el_height = document.getElementById('Height');
const label_height = document.getElementById('LabelHeight').firstChild;

const el_deltaT = document.getElementById('DeltaT');
const label_deltaT = document.getElementById('LabelDeltaT').firstChild;

const el_radius = document.getElementById('Radius');
const label_radius = document.getElementById('LabelRadius').firstChild;

function updateTrapezoidControls()
{
    const w = parseInt(el_width.value);
    const h = parseInt(el_height.value);
    const dt = parseFloat(el_deltaT.value);
    const r = parseInt(el_radius.value);
    

    label_width.textContent = `Width px = ${w}:`;
    label_height.textContent = `Height px = ${h}:`;
    label_deltaT.textContent = `trapezoid coefficient = ${dt}:`;
    label_radius.textContent = `Corners' radius px = ${r}:`;


    svg.setAttribute('width', w);
    svg.setAttribute('height', h);

    const d = getTrapezoidPath(w, h, dt, r);

    path.setAttribute('d', d);

}

el_width.addEventListener('input', updateTrapezoidControls);
el_height.addEventListener('input', updateTrapezoidControls);
el_deltaT.addEventListener('input', updateTrapezoidControls);
el_radius.addEventListener('input', updateTrapezoidControls);

updateTrapezoidControls();
