const ZSCORE_CRITICAL_THRESHOLD = 1.96; // 95-percentile
const ZSCORE_NINETYNINTH = 2.326347875; // 99-percentile
const ONE_DIV_SQRT_2PI = 0.3989422804014327; // V8 float of 1/SQRT(2 * PI)
const MAX_P_PRECISION = Math.exp(-16); // Rought estimation of V8 precision, -16 is 1.1253517471925912e-7
const MIN_P = -6.44357455534; // v8 float 0.0...0
const MAX_P = 6.44357455534; // v8 float 1.0...0

const getMean = (numArr) => {
  let total = 0;
  let length = numArr.length; // store local to reduce potential prop lookups

  for(let i = 0; i < length; i++) {
    total += numArr[i];
  }

  return total / length;
};

const getStandardDeviation = (numArr, mean) => {
  return Math.sqrt(numArr.reduce((sq, n) => (
    sq + Math.pow(n - mean, 2)
  ), 0) / (numArr.length - 1));
};

const getInformationFromValues = (numArr) => {
  let mean = getMean(numArr);

  return {
    mean,
    standardDeviation: getStandardDeviation(numArr, mean),
  }
};

const getZScore = (value, mean, sDeviation) => ( sDeviation !== 0 ? (value - mean) / sDeviation : 0 );

const getFastPValue = (zScore) => {
  if(zScore <= MIN_P) {
   return 0;
  }
  if(zScore >= MAX_P) {
   return 1;
  }

  let factorialK = 1;
  let k = 0;
  let sum = 0;
  let term = 1;

  while(Math.abs(term) > MAX_P_PRECISION) {
    term = ONE_DIV_SQRT_2PI * Math.pow(-1 , k) * Math.pow(zScore , k) / (2 * k + 1) / Math.pow(2 , k) * Math.pow(zScore, k + 1) / factorialK;
    sum += term;
    k++;
    factorialK *= k;
  }
  sum += 0.5;

  return sum;
};


const getWeight = (zScore, pValue) => (zScore * pValue);

module.exports = {
  getInformationFromValues,
  getZScore,
  getFastPValue,
  getWeight,
};
