# Demos

## Basic sequence diagram

<svg height="543" style="max-width:814px" fill="#333" font-family="&quot;trebuchet ms&quot;,verdana,arial,sans-serif" font-size="16px" viewBox="-50 -10 814 543">
  <line x1="75" x2="75" y1="5" y2="532" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="75" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="75" fill="black" stroke="none" dy="0">Alice</tspan></text>
  <line x1="318" x2="318" y1="5" y2="532" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" x="243" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="318" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="318" fill="black" stroke="none" dy="0">Bob</tspan></text>
  <line x1="539" x2="539" y1="5" y2="532" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" x="464" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="539" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="539" fill="black" stroke="none" dy="0">John</tspan></text>
  <defs>
    <marker id="a" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="9" refY="5">
      <path stroke="#333" d="m0 0 10 5-10 5z"/>
    </marker>
  </defs>
  <defs>
    <marker id="b" markerHeight="8" markerWidth="15" orient="auto" refX="16" refY="4">
      <path stroke="#333" stroke-dasharray="0,0" d="M9 2v4l7-2z"/>
    </marker>
  </defs>
  <defs>
    <marker markerHeight="28" markerWidth="20" orient="auto" refX="18" refY="7">
      <path d="m18 7-9 6 5-6-5-6z"/>
    </marker>
  </defs>
  <defs>
    <marker fill="#333" markerHeight="40" markerWidth="60" orient="auto" refX="15" refY="15">
      <circle cx="15" cy="15" r="6"/>
    </marker>
  </defs>
  <text x="197" y="80" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Hello Bob, how are you?</text>
  <line x1="75" x2="318" y1="113" y2="113" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="429" y="128" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">How about you John?</text>
  <line x1="318" x2="539" y1="161" y2="161" fill="none" stroke="#333" stroke-dasharray="3,3" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="197" y="176" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">I am good thanks!</text>
  <line x1="318" x2="75" y1="209" y2="209" fill="none" stroke="#333" stroke-dasharray="3,3" stroke-width="1.5" marker-end="url(#b)"/>
  <text x="429" y="224" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">I am good thanks!</text>
  <line x1="318" x2="539" y1="257" y2="257" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#b)"/>
  <rect width="150" height="84" x="564" y="267" fill="#fff5ad" stroke="#aaaa33" rx="0" ry="0"/>
  <text x="639" y="272" fill="black" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="639">Bob thinks a long</tspan></text>
  <text x="639" y="288" fill="black" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="639">long time, so long</tspan></text>
  <text x="639" y="304" fill="black" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="639">that the text does</tspan></text>
  <text x="639" y="320" fill="black" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="639">not fit on a row.</tspan></text>
  <text x="197" y="366" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Checking with John...</text>
  <line x1="318" x2="75" y1="399" y2="399" fill="none" stroke="#333" stroke-dasharray="3,3" stroke-width="1.5"/>
  <text x="307" y="414" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Yes... John, how are you?</text>
  <line x1="75" x2="539" y1="447" y2="447" fill="none" stroke="#333" stroke-width="1.5"/>
  <g>
    <rect width="150" height="65" y="467" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="75" y="499.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="75" fill="black" stroke="none" dy="0">Alice</tspan></text>
  </g>
  <g>
    <rect width="150" height="65" x="243" y="467" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="318" y="499.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="318" fill="black" stroke="none" dy="0">Bob</tspan></text>
  </g>
  <g>
    <rect width="150" height="65" x="464" y="467" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="539" y="499.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="539" fill="black" stroke="none" dy="0">John</tspan></text>
  </g>
</svg>


## Basic flowchart

<svg height="166.719" style="max-width:497.7406311035156px" fill="#333" font-family="&quot;trebuchet ms&quot;,verdana,arial,sans-serif" font-size="16px" viewBox="0 0 497.741 166.719">
  <defs>
    <path stroke-dasharray="1,0" d="m0 0 10 5-10 5z"/>
  </defs>
  <g opacity="1">
    <path fill="none" stroke="#333" stroke-width="1.5px" marker-end="url(#a)" d="m103.575 69.54 67.12-30.68h76.72"/>
    <defs>
      <marker id="a" markerHeight="6" markerUnits="strokeWidth" markerWidth="8" orient="auto" refX="9" refY="5" viewBox="0 0 10 10">
        <use stroke-dasharray="1,0" xlink:href="#reuse-0"/>
      </marker>
    </defs>
  </g>
  <g opacity="1">
    <path fill="none" stroke="#333" stroke-width="1.5px" marker-end="url(#b)" d="m103.575 108.54 67.12 30.679h56.868"/>
    <defs>
      <marker id="b" markerHeight="6" markerUnits="strokeWidth" markerWidth="8" orient="auto" refX="9" refY="5" viewBox="0 0 10 10">
        <use stroke-dasharray="1,0" xlink:href="#reuse-0"/>
      </marker>
    </defs>
  </g>
  <g opacity="1">
    <path fill="none" stroke="#333" stroke-width="1.5px" marker-end="url(#c)" d="M309.133 38.86h44.851l46.785 29.395"/>
    <defs>
      <marker id="c" markerHeight="6" markerUnits="strokeWidth" markerWidth="8" orient="auto" refX="9" refY="5" viewBox="0 0 10 10">
        <use stroke-dasharray="1,0" xlink:href="#reuse-0"/>
      </marker>
    </defs>
  </g>
  <g opacity="1">
    <path fill="none" stroke="#333" stroke-width="1.5px" marker-end="url(#d)" d="M328.984 139.219h25l46.785-28.395"/>
    <defs>
      <marker id="d" markerHeight="6" markerUnits="strokeWidth" markerWidth="8" orient="auto" refX="9" refY="5" viewBox="0 0 10 10">
        <use stroke-dasharray="1,0" xlink:href="#reuse-0"/>
      </marker>
    </defs>
  </g>
  <g>
    <g color="#333" transform="translate(170.695 38.86) translate(-31.867 -9.5)">
      <rect width="63.734" height="19" fill="#e8e8e8" opacity=".5" rx="0" ry="0" style="background-color:#e8e8e8"/>
      <foreignObject width="63.734" height="19">
        <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
          <span style="background-color:#e8e8e8;text-align:center" fill="#333" color="#333">
            Link text
          </span>
        </div>
      </foreignObject>
    </g>
    <foreignObject width="0" height="0" color="#333">
      <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
        <span style="background-color:#e8e8e8;text-align:center" fill="#333" color="#333"/>
      </div>
    </foreignObject>
    <foreignObject width="0" height="0" color="#333">
      <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
        <span style="background-color:#e8e8e8;text-align:center" fill="#333" color="#333"/>
      </div>
    </foreignObject>
    <foreignObject width="0" height="0" color="#333">
      <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
        <span style="background-color:#e8e8e8;text-align:center" fill="#333" color="#333"/>
      </div>
    </foreignObject>
  </g>
  <g>
    <g opacity="1" transform="translate(60.914 89.04)">
      <rect width="105.828" height="39" x="-52.914" y="-19.5" fill="#ececff" stroke="#9370db" stroke-width="1px" rx="0" ry="0"/>
      <foreignObject width="85.828" height="19" transform="translate(-42.914 -9.5)" color="#333">
        <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
          Square Rect
        </div>
      </foreignObject>
    </g>
    <g opacity="1" transform="translate(278.273 38.86)">
      <circle r="30.859" fill="#ececff" stroke="#9370db" stroke-width="1px"/>
      <foreignObject width="41.719" height="19" transform="translate(-20.86 -9.5)" color="#333">
        <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
          Circle
        </div>
      </foreignObject>
    </g>
    <g opacity="1" transform="translate(278.273 139.219)">
      <rect width="101.422" height="39" x="-50.711" y="-19.5" fill="#ececff" stroke="#9370db" stroke-width="1px" rx="5" ry="5"/>
      <foreignObject width="81.422" height="19" transform="translate(-40.71 -9.5)" color="#333">
        <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
          Round Rect
        </div>
      </foreignObject>
    </g>
    <g opacity="1" transform="translate(434.362 89.04)">
      <polygon fill="#ececff" stroke="#9370db" stroke-width="1px" points="55.378125000000004,0 110.75625000000001,-55.378125000000004 55.378125000000004,-110.75625000000001 0,-55.378125000000004" transform="translate(-55.378 55.378)"/>
      <foreignObject width="64.063" height="19" transform="translate(-32.031 -9.5)" color="#333">
        <div xmlns="http://www.w3.org/1999/xhtml" style="white-space:nowrap" display="inline-block">
          Rhombus
        </div>
      </foreignObject>
    </g>
  </g>
</svg>


## Loops, alt and opt

<svg height="563" style="max-width:498px" fill="#333" font-family="&quot;trebuchet ms&quot;,verdana,arial,sans-serif" font-size="16px" viewBox="-50 -10 498 563">
  <line x1="75" x2="75" y1="5" y2="552" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="75" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="75" fill="black" stroke="none" dy="0">Alice</tspan></text>
  <line x1="323" x2="323" y1="5" y2="552" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" x="248" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="323" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="323" fill="black" stroke="none" dy="0">Bob</tspan></text>
  <defs>
    <marker id="a" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="9" refY="5">
      <path stroke="#333" d="m0 0 10 5-10 5z"/>
    </marker>
  </defs>
  <defs>
    <marker markerHeight="8" markerWidth="15" orient="auto" refX="16" refY="4">
      <path stroke="#333" stroke-dasharray="0,0" d="M9 2v4l7-2z"/>
    </marker>
  </defs>
  <defs>
    <marker markerHeight="28" markerWidth="20" orient="auto" refX="18" refY="7">
      <path d="m18 7-9 6 5-6-5-6z"/>
    </marker>
  </defs>
  <defs>
    <marker fill="#333" markerHeight="40" markerWidth="60" orient="auto" refX="15" refY="15">
      <circle cx="15" cy="15" r="6"/>
    </marker>
  </defs>
  <text x="199" y="125" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Hello Bob, how are you?</text>
  <line x1="75" x2="323" y1="158" y2="158" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="199" y="218" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Not so good :(</text>
  <line x1="323" x2="75" y1="251" y2="251" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="199" y="311" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Feeling fresh like a daisy</text>
  <line x1="323" x2="75" y1="344" y2="344" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <line x1="65" x2="333" y1="168" y2="168" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="333" x2="333" y1="168" y2="354" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="65" x2="333" y1="354" y2="354" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="65" x2="65" y1="168" y2="354" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="65" x2="333" y1="266" y2="266" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="3,3" stroke-width="2px"/>
  <polygon fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" points="65,168 115,168 115,181 106.6,188 65,188"/>
  <text x="90" y="181" fill="black" alignment-baseline="middle" dominant-baseline="middle" font-weight="400" text-anchor="middle">alt</text>
  <text x="224" y="186" fill="black" font-weight="400" text-anchor="middle"><tspan x="224">[is sick]</tspan></text>
  <text x="199" y="284" fill="black" font-weight="400" text-anchor="middle">[is well]</text>
  <text x="199" y="414" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Thanks for asking</text>
  <line x1="323" x2="75" y1="447" y2="447" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <g>
    <line x1="65" x2="333" y1="364" y2="364" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <line x1="333" x2="333" y1="364" y2="457" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <line x1="65" x2="333" y1="457" y2="457" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <line x1="65" x2="65" y1="364" y2="457" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <polygon fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" points="65,364 115,364 115,377 106.6,384 65,384"/>
    <text x="90" y="377" fill="black" alignment-baseline="middle" dominant-baseline="middle" font-weight="400" text-anchor="middle">opt</text>
    <text x="224" y="382" fill="black" font-weight="400" text-anchor="middle"><tspan x="224">[Extra response]</tspan></text>
  </g>
  <g>
    <line x1="55" x2="343" y1="75" y2="75" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <line x1="343" x2="343" y1="75" y2="467" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <line x1="55" x2="343" y1="467" y2="467" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <line x1="55" x2="55" y1="75" y2="467" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
    <polygon fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" points="55,75 105,75 105,88 96.6,95 55,95"/>
    <text x="80" y="88" fill="black" alignment-baseline="middle" dominant-baseline="middle" font-weight="400" text-anchor="middle">loop</text>
    <text x="224" y="93" fill="black" font-weight="400" text-anchor="middle"><tspan x="224">[Daily query]</tspan></text>
  </g>
  <g>
    <rect width="150" height="65" y="487" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="75" y="519.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="75" fill="black" stroke="none" dy="0">Alice</tspan></text>
  </g>
  <g>
    <rect width="150" height="65" x="248" y="487" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="323" y="519.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="323" fill="black" stroke="none" dy="0">Bob</tspan></text>
  </g>
</svg>


## Message to self in loop

<svg height="578" style="max-width:750px" fill="#333" font-family="&quot;trebuchet ms&quot;,verdana,arial,sans-serif" font-size="16px" viewBox="-50 -10 750 578">
  <line x1="75" x2="75" y1="5" y2="567" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="75" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="75" fill="black" stroke="none" dy="0">Alice</tspan></text>
  <line x1="275" x2="275" y1="5" y2="567" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" x="200" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="275" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="275" fill="black" stroke="none" dy="0">Bob</tspan></text>
  <line x1="475" x2="475" y1="5" y2="567" stroke="grey" stroke-width=".5"/>
  <rect width="150" height="65" x="400" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
  <text x="475" y="32.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="475" fill="black" stroke="none" dy="0">John</tspan></text>
  <defs>
    <marker id="a" markerHeight="12" markerUnits="userSpaceOnUse" markerWidth="12" orient="auto" refX="9" refY="5">
      <path stroke="#333" d="m0 0 10 5-10 5z"/>
    </marker>
  </defs>
  <defs>
    <marker markerHeight="8" markerWidth="15" orient="auto" refX="16" refY="4">
      <path stroke="#333" stroke-dasharray="0,0" d="M9 2v4l7-2z"/>
    </marker>
  </defs>
  <defs>
    <marker markerHeight="28" markerWidth="20" orient="auto" refX="18" refY="7">
      <path d="m18 7-9 6 5-6-5-6z"/>
    </marker>
  </defs>
  <defs>
    <marker fill="#333" markerHeight="40" markerWidth="60" orient="auto" refX="15" refY="15">
      <circle cx="15" cy="15" r="6"/>
    </marker>
  </defs>
  <text x="275" y="80" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Hello John, how are you?</text>
  <line x1="75" x2="475" y1="113" y2="113" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="475" y="173" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Fight against hypochondria</text>
  <path fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)" d="M475 206c60-10 60 30 0 20"/>
  <line x1="368.5" x2="581.5" y1="123" y2="123" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="581.5" x2="581.5" y1="123" y2="276" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="368.5" x2="581.5" y1="276" y2="276" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <line x1="368.5" x2="368.5" y1="123" y2="276" fill="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" stroke-dasharray="2,2" stroke-width="2px"/>
  <polygon fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" points="368.5,123 418.5,123 418.5,136 410.1,143 368.5,143"/>
  <text x="394" y="136" fill="black" alignment-baseline="middle" dominant-baseline="middle" font-weight="400" text-anchor="middle">loop</text>
  <text x="500" y="141" fill="black" font-weight="400" text-anchor="middle"><tspan x="500">[Healthcheck]</tspan></text>
  <g>
    <rect width="150" height="52" x="500" y="286" fill="#fff5ad" stroke="#aaaa33" rx="0" ry="0"/>
    <text x="575" y="291" fill="black" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="575">Rational thoughts</tspan></text>
    <text x="575" y="307" fill="black" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="575">prevail...</tspan></text>
  </g>
  <text x="275" y="353" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Great!</text>
  <line x1="475" x2="75" y1="386" y2="386" fill="none" stroke="#333" stroke-dasharray="3,3" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="375" y="401" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">How about you?</text>
  <line x1="475" x2="275" y1="434" y2="434" fill="none" stroke="#333" stroke-width="1.5" marker-end="url(#a)"/>
  <text x="375" y="449" stroke="#333" alignment-baseline="middle" dominant-baseline="middle" dy="1em" font-weight="400" text-anchor="middle">Jolly good!</text>
  <line x1="275" x2="475" y1="482" y2="482" fill="none" stroke="#333" stroke-dasharray="3,3" stroke-width="1.5" marker-end="url(#a)"/>
  <g>
    <rect width="150" height="65" y="502" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="75" y="534.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="75" fill="black" stroke="none" dy="0">Alice</tspan></text>
  </g>
  <g>
    <rect width="150" height="65" x="200" y="502" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="275" y="534.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="275" fill="black" stroke="none" dy="0">Bob</tspan></text>
  </g>
  <g>
    <rect width="150" height="65" x="400" y="502" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" rx="3" ry="3"/>
    <text x="475" y="534.5" fill="#ECECFF" stroke="hsl(259.6261682243,59.7765363128%,87.9019607843%)" alignment-baseline="central" dominant-baseline="central" font-family="Open-Sans,sans-serif" font-size="14px" font-weight="400" text-anchor="middle"><tspan x="475" fill="black" stroke="none" dy="0">John</tspan></text>
  </g>
</svg>
