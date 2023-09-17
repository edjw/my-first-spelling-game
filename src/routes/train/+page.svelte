<script>
  export let carriages = 6; // default to 1 carriage

  const carriageWidth = 150; // the width of one carriage
  const gap = 15; // the gap between the train and carriages, and between carriages
  const baseWidth = 500; // the base width of the SVG with no carriages
  const totalCarriageWidth = carriages * (carriageWidth + gap);
  const svgWidth = baseWidth + totalCarriageWidth;

  // Adjust the SVG viewBox width dynamically
  let viewBox = `0 0 ${svgWidth} 300`;

  // Calculate positions for carriages
  let carriagePositions = Array.from(
    { length: carriages },
    (_, i) => 375 + i * (carriageWidth + gap)
  );
</script>

<div
  class="max-w-full relative w-full before:content-[''] before:block before:pt-[60%]"
>
  <svg class="absolute inset-0" {viewBox} xmlns="http://www.w3.org/2000/svg">
    <!-- Golden dome -->
    <ellipse cx="250" cy="170" rx="10" ry="10" fill="gold" />

    <!-- Train body -->
    <rect x="190" y="170" width="120" height="60" fill="#FF6347" />

    <!-- Train cabin -->
    <rect x="310" y="100" width="50" height="130" fill="#FF6347" />

    <!-- Window in the cabin -->
    <rect x="320" y="110" width="30" height="40" fill="#37474F" rx="5" ry="5" />
    <rect
      x="325"
      y="115"
      width="20"
      height="30"
      fill="lightblue"
      rx="5"
      ry="5"
    />

    <!-- Train chimney -->
    <rect x="195" y="130" width="20" height="40" fill="#8B4513" />

    <!-- Animated smoke moving to the top right -->
    <ellipse cx="230" cy="105" rx="20" ry="14" fill="grey" opacity="0.8">
      <animate
        attributeName="cy"
        from="105"
        to="55"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="cx"
        from="230"
        to="280"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.8"
        to="0.2"
        dur="2s"
        repeatCount="indefinite"
      />
    </ellipse>
    <ellipse cx="250" cy="95" rx="25" ry="16" fill="grey" opacity="0.7">
      <animate
        attributeName="cy"
        from="95"
        to="45"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="cx"
        from="250"
        to="300"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.7"
        to="0.1"
        dur="2s"
        repeatCount="indefinite"
      />
    </ellipse>
    <ellipse cx="275" cy="85" rx="28" ry="18" fill="grey" opacity="0.6">
      <animate
        attributeName="cy"
        from="85"
        to="35"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="cx"
        from="275"
        to="325"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        from="0.6"
        to="0"
        dur="2s"
        repeatCount="indefinite"
      />
    </ellipse>

    <!-- Wheels -->
    <circle cx="210" cy="230" r="20" fill="black" />
    <circle cx="275" cy="230" r="20" fill="black" />
    <circle cx="340" cy="230" r="20" fill="black" />

    {#each carriagePositions as position}
      <!-- Freight Carriage bed -->
      <rect x={position} y="170" width="150" height="60" fill="#A52A2A" />
      <line
        x1={position}
        y1="170"
        x2={position + 150}
        y2="170"
        stroke="#000000"
        stroke-width="2"
      />
      <line
        x1={position}
        y1="230"
        x2={position + 150}
        y2="230"
        stroke="#000000"
        stroke-width="2"
      />

      <!-- Carriage Wheels -->
      <circle cx={position + 20} cy="230" r="20" fill="black" />
      <circle cx={position + 130} cy="230" r="20" fill="black" />
    {/each}
  </svg>
</div>
