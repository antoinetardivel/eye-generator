type color = number[];

const gradientGenerator = (color1: color, color2: color, steps: number) => {
  let newColor = [];
  let deltaAlphas: color = [];
  color1.map((alpha, index) => {
    if (alpha < color2[index]) {
      deltaAlphas.push(color2[index] - alpha);
    } else if (alpha > color2[index]) {
      deltaAlphas.push(alpha - color2[index]);
    } else {
      deltaAlphas.push(0);
    }
  });
  let stepAlphas: color = [];
  deltaAlphas.map((alpha) => {
    stepAlphas.push(alpha / (steps - 1));
  });
  let prevColor = color1;
  newColor.push(color1);
  for (let i = 0; i < steps - 2; i++) {
    let stepColor: color = [];
    prevColor.map((alpha, index) => {
      if (color1[index] < color2[index]) {
        stepColor.push(prevColor[index] + stepAlphas[index]);
      } else if (color1[index] > color2[index]) {
        stepColor.push(prevColor[index] - stepAlphas[index]);
      } else {
        stepColor.push(prevColor[index]);
      }
    });
    prevColor = stepColor;
    newColor.push(stepColor);
  }
  newColor.push(color2);

  return newColor;
};
export default gradientGenerator;
