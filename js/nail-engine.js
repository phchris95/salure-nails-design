/* Motor do "Monte sua unha" (versão fotográfica).
   Não desenha uma unha "por cima": usa o brilho e o volume da unha real de cada dedo da foto
   (medidos e guardados em img/nail-atlas.png) e troca só a cor, o formato e o comprimento.
   Onde o alongamento passa da unha real, o brilho continua com o perfil medido no meio da unha. */
(function () {
  'use strict';

  // Eixo, comprimento (N) e meia largura (hw) de cada unha real, em pixels da foto; P: perfil de brilho
  // através da unha; nude: cor da unha real (linear); ay: linha da unha no atlas. Gerado por preparar.py.
  const DATA = [{"ox":552.42,"oy":113.86,"a":44.043,"N":199.47,"hw":51.29,"umin":-16,"vmin":-68,"w":348,"h":136,"P":[0.151,0.238,0.35,0.487,0.622,0.735,0.815,0.874,0.911,0.935,0.952,0.964,0.973,0.981,0.987,0.992,0.995,0.995,0.993,0.989,0.984,0.98,0.977,0.979,0.984,0.995,1.01,1.026,1.039,1.049,1.057,1.064,1.074,1.088,1.106,1.126,1.145,1.162,1.174,1.181,1.184,1.183,1.176,1.165,1.15,1.131,1.108,1.08,1.048,1.009,0.966,0.921,0.879,0.839,0.805,0.773,0.746,0.724,0.704,0.687,0.673,0.657,0.64,0.622,0.603,0.585,0.568,0.552,0.536,0.523,0.512,0.503,0.498,0.494,0.489,0.484,0.477,0.468,0.457,0.449,0.442],"nude":[0.1833,0.098,0.0988],"ring":false,"hl":{"a":8.73,"b":-0.1054,"sig":5.99,"A":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.086,0.125,0.172,0.225,0.28,0.337,0.392,0.443,0.491,0.539,0.589,0.643,0.698,0.745,0.784,0.813,0.833,0.846,0.854,0.858,0.861,0.865,0.873,0.884,0.895,0.902,0.905,0.902,0.895,0.883,0.869,0.853,0.836,0.819,0.802,0.786,0.772,0.76,0.751,0.745,0.739,0.735,0.731,0.728,0.727,0.727,0.728,0.728,0.726,0.721,0.714,0.703,0.689,0.671,0.651,0.63,0.61,0.589,0.568,0.546,0.524,0.5,0.478,0.456,0.436,0.417,0.399,0.382,0.364,0.347,0.329,0.311,0.294,0.278,0.264,0.252,0.241,0.231,0.222,0.214,0.207,0.201,0.196,0.192,0.188,0.185,0.182,0.18,0.177,0.174,0.17,0.165,0.161,0.157,0.153,0.149,0.146,0.142,0.137,0.133,0.129,0.125,0.122,0.119,0.116,0.113,0.112,0.11,0.107,0.105,0.101,0.097,0.093,0.089,0.085,0.082,0.078,0.075,0.072,0.069,0.066,0.063,0.061,0.059,0.057,0.055,0.054,0.053,0.052,0.051,0.05,0.05,0.049,0.049,0.049,0.049,0.049,0.049,0.05,0.05,0.052,0.053,0.056,0.06,0.064,0.068,0.071,0.072,0.074,0.074,0.075,0.075,0.076,0.076,0.077,0.077,0.076,0.074,0.072,0.069,0.067,0.065,0.065,0.064,0.063,0.062,0.061,0.059,0.058,0.055,0.053,0.05,0.047,0.044,0.041,0.038,0.034,0.031,0.028,0.025,0.023,0.021,0.019,0.017,0.016,0.015,0.014,0.013,0.012,0.012,0.012,0.012,0.012,0.012,0.012,0.012]},"side":{"aT":-50.951,"bT":-0.00733,"aB":57.487,"bB":-0.06733},"ay":0},{"ox":610.04,"oy":383.38,"a":33.293,"N":198.1,"hw":61.49,"umin":-16,"vmin":-78,"w":367,"h":156,"P":[0.178,0.248,0.342,0.454,0.559,0.647,0.731,0.798,0.853,0.894,0.925,0.944,0.952,0.953,0.953,0.95,0.948,0.948,0.954,0.963,0.978,0.997,1.025,1.062,1.109,1.18,1.285,1.427,1.622,1.886,2.219,2.627,3.101,3.605,4.092,4.516,4.838,5.038,5.112,5.053,4.848,4.488,3.991,3.404,2.802,2.253,1.806,1.483,1.263,1.109,1.0,0.92,0.853,0.799,0.755,0.723,0.7,0.682,0.662,0.64,0.615,0.586,0.555,0.524,0.494,0.464,0.433,0.404,0.376,0.353,0.336,0.329,0.33,0.34,0.345,0.344,0.333,0.317,0.293,0.275,0.262],"nude":[0.1678,0.0878,0.0902],"ring":false,"hl":{"a":7.32,"b":-0.086,"sig":7.76,"A":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.185,0.189,0.194,0.202,0.212,0.225,0.241,0.262,0.289,0.318,0.352,0.392,0.435,0.481,0.528,0.575,0.622,0.667,0.71,0.749,0.787,0.82,0.849,0.873,0.892,0.906,0.917,0.926,0.932,0.937,0.942,0.947,0.953,0.958,0.964,0.97,0.975,0.981,0.986,0.99,0.993,0.996,0.997,0.998,0.999,0.999,0.998,0.998,0.997,0.997,0.997,0.997,0.997,0.997,0.996,0.996,0.995,0.995,0.994,0.993,0.993,0.992,0.992,0.991,0.991,0.991,0.991,0.991,0.991,0.992,0.993,0.994,0.995,0.996,0.997,0.998,0.999,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.998,0.997,0.996,0.995,0.994,0.993,0.993,0.992,0.992,0.992,0.991,0.99,0.989,0.988,0.987,0.986,0.985,0.984,0.983,0.981,0.98,0.979,0.978,0.977,0.976,0.976,0.977,0.977,0.978,0.978,0.979,0.98,0.981,0.982,0.983,0.985,0.986,0.987,0.987,0.988,0.988,0.988,0.988,0.987,0.987,0.988,0.988,0.988,0.989,0.989,0.99,0.991,0.991,0.992,0.993,0.994,0.995,0.996,0.997,0.998,0.999,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.999,0.999,0.998,0.998,0.996,0.994,0.991,0.985,0.977,0.965,0.95,0.929,0.902,0.868,0.827,0.781,0.731,0.677,0.621,0.564,0.506,0.449,0.393,0.339,0.288,0.24,0.197,0.16,0.131,0.108,0.091,0.079,0.069,0.062,0.056,0.056,0.056,0.056,0.056,0.056,0.056,0.056]},"side":{"aT":-56.476,"bT":-0.05499,"aB":70.488,"bB":-0.08676},"ay":136},{"ox":485.08,"oy":542.26,"a":22.163,"N":211.35,"hw":58.51,"umin":-16,"vmin":-75,"w":374,"h":150,"P":[0.821,0.86,0.909,0.967,1.022,1.073,1.111,1.125,1.116,1.081,1.034,0.993,0.969,0.964,0.974,0.997,1.035,1.092,1.185,1.313,1.48,1.687,1.935,2.21,2.518,2.861,3.225,3.591,3.933,4.23,4.462,4.622,4.721,4.764,4.748,4.652,4.446,4.105,3.635,3.077,2.469,1.905,1.45,1.121,0.9,0.782,0.715,0.667,0.63,0.598,0.573,0.552,0.535,0.521,0.511,0.504,0.501,0.501,0.502,0.503,0.502,0.496,0.486,0.471,0.451,0.427,0.4,0.372,0.342,0.312,0.283,0.258,0.238,0.221,0.209,0.201,0.195,0.191,0.186,0.183,0.18],"nude":[0.1542,0.0864,0.0978],"ring":false,"hl":{"a":-7.43,"b":-0.0131,"sig":7.39,"A":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.086,0.106,0.127,0.145,0.16,0.172,0.182,0.192,0.204,0.219,0.237,0.259,0.284,0.31,0.336,0.363,0.391,0.421,0.456,0.496,0.54,0.586,0.633,0.677,0.719,0.756,0.789,0.817,0.838,0.854,0.865,0.87,0.871,0.869,0.865,0.857,0.847,0.835,0.822,0.809,0.796,0.783,0.772,0.761,0.752,0.745,0.738,0.732,0.728,0.725,0.724,0.727,0.732,0.74,0.749,0.759,0.769,0.779,0.789,0.799,0.809,0.819,0.829,0.839,0.849,0.859,0.867,0.874,0.881,0.886,0.89,0.893,0.896,0.898,0.9,0.901,0.903,0.904,0.905,0.906,0.907,0.908,0.909,0.91,0.911,0.911,0.912,0.913,0.914,0.914,0.915,0.916,0.917,0.917,0.918,0.919,0.919,0.918,0.917,0.916,0.915,0.914,0.913,0.911,0.91,0.908,0.907,0.905,0.903,0.902,0.9,0.898,0.897,0.895,0.894,0.893,0.892,0.892,0.891,0.89,0.889,0.888,0.887,0.886,0.885,0.884,0.883,0.882,0.882,0.881,0.88,0.88,0.879,0.879,0.879,0.879,0.88,0.881,0.881,0.882,0.883,0.884,0.885,0.887,0.889,0.891,0.893,0.895,0.897,0.898,0.899,0.9,0.9,0.901,0.902,0.902,0.902,0.902,0.902,0.901,0.901,0.9,0.9,0.9,0.899,0.898,0.897,0.896,0.896,0.895,0.895,0.895,0.895,0.895,0.896,0.896,0.897,0.897,0.897,0.897,0.896,0.894,0.889,0.881,0.868,0.849,0.823,0.79,0.751,0.707,0.659,0.607,0.554,0.5,0.447,0.395,0.345,0.297,0.253,0.213,0.178,0.178,0.178,0.178,0.178,0.178,0.178,0.178]},"side":{"aT":-53.705,"bT":-0.04944,"aB":62.036,"bB":-0.02834},"ay":292},{"ox":118.01,"oy":648.25,"a":19.201,"N":181.97,"hw":57.15,"umin":-16,"vmin":-74,"w":342,"h":148,"P":[0.861,0.888,0.918,0.95,0.977,1.002,1.031,1.069,1.116,1.167,1.214,1.253,1.283,1.311,1.35,1.415,1.519,1.677,1.9,2.19,2.541,2.928,3.309,3.647,3.91,4.084,4.164,4.149,4.031,3.804,3.475,3.067,2.624,2.182,1.784,1.464,1.225,1.053,0.939,0.868,0.813,0.769,0.734,0.707,0.685,0.665,0.647,0.628,0.609,0.592,0.577,0.564,0.553,0.539,0.524,0.506,0.486,0.467,0.448,0.431,0.414,0.395,0.373,0.353,0.334,0.316,0.298,0.281,0.263,0.244,0.225,0.209,0.195,0.183,0.174,0.167,0.161,0.155,0.147,0.14,0.134],"nude":[0.1661,0.0886,0.0952],"ring":false,"hl":{"a":-12.41,"b":-0.0643,"sig":6.63,"A":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.136,0.165,0.198,0.233,0.272,0.313,0.356,0.401,0.447,0.491,0.531,0.566,0.598,0.625,0.647,0.665,0.678,0.684,0.685,0.681,0.671,0.656,0.638,0.618,0.598,0.577,0.557,0.538,0.519,0.5,0.482,0.466,0.453,0.444,0.439,0.439,0.444,0.453,0.464,0.478,0.493,0.509,0.527,0.545,0.564,0.584,0.605,0.625,0.643,0.661,0.676,0.69,0.702,0.712,0.721,0.727,0.732,0.736,0.741,0.746,0.75,0.754,0.758,0.761,0.764,0.767,0.77,0.773,0.776,0.779,0.782,0.785,0.787,0.789,0.791,0.793,0.795,0.797,0.799,0.801,0.803,0.804,0.805,0.806,0.806,0.807,0.808,0.808,0.808,0.808,0.808,0.808,0.807,0.807,0.807,0.807,0.806,0.806,0.806,0.806,0.806,0.806,0.806,0.806,0.805,0.805,0.804,0.804,0.803,0.801,0.8,0.798,0.797,0.795,0.793,0.791,0.79,0.788,0.787,0.787,0.786,0.785,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.784,0.785,0.785,0.786,0.787,0.787,0.788,0.789,0.789,0.79,0.79,0.791,0.792,0.793,0.793,0.793,0.792,0.79,0.787,0.782,0.775,0.764,0.749,0.73,0.706,0.677,0.645,0.609,0.571,0.531,0.491,0.452,0.414,0.378,0.343,0.31,0.281,0.281,0.281,0.281,0.281,0.281,0.281]},"side":{"aT":-51.815,"bT":-0.06293,"aB":65.618,"bB":-0.08927},"ay":442}];

  // Formatos: a ponta sai da largura real da unha, sem quina.
  // Perfil da largura no trecho da ponta (x de 0 a 1): mistura de superelipse (n) e de uma curva
  // que começa tangente e vira reta (h = 1, curvatura r); tf: largura que sobra na ponta
  // (ballerina tem a ponta reta e mais estreita); m arredonda os cantos da ponta;
  // T: comprimento do trecho, em meias larguras da unha.
  const SHAPES = {
    quadrado: { n: 7, h: 0, r: 0.3, tf: 0, m: 60, T: 0.42 },
    amendoa: { n: 1.6, h: 0, r: 0.3, tf: 0, m: 60, T: 1.25 },
    stiletto: { n: 1.6, h: 1, r: 0.22, tf: 0, m: 60, T: 2.0 },
    ballerina: { n: 1.6, h: 1, r: 0.3, tf: 0.58, m: 8, T: 1.35 },
  };
  function profile(st, x) {
    if (x <= 0) return 1;
    if (x >= 1) return 0;
    const sup = Math.pow(1 - Math.pow(x, st.n), 1 / st.n);
    const r = st.r, hyp = 1 - (Math.sqrt(x * x + r * r) - r) / (Math.sqrt(1 + r * r) - r);
    const base = sup + (hyp - sup) * st.h;
    return (st.tf + (1 - st.tf) * base) * Math.pow(1 - Math.pow(x, st.m), 1 / st.m);
  }
  const LENGTHS = { curta: 10, media: 46, longa: 84 };

  // cores: sRGB <-> linear
  const toLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const hexLin = (h) => { const n = parseInt(h.slice(1), 16); return [toLin((n >> 16) & 255), toLin((n >> 8) & 255), toLin(n & 255)]; };
  const ENC = new Uint8ClampedArray(4097);
  for (let i = 0; i <= 4096; i++) { const c = i / 4096; ENC[i] = Math.round(255 * (c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)); }
  const enc = (c) => ENC[c <= 0 ? 0 : c >= 1 ? 4096 : (c * 4096) | 0];
  const hash = (i, j, s) => { let h = (Math.imul(i, 374761393) + Math.imul(j, 668265263) + Math.imul(s, 1442695041)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

  function NailStudio(canvas, opts) {
    const ctx = canvas.getContext('2d');
    const base = opts.base, atlas = opts.atlas, data = opts.data || DATA;
    canvas.width = base.naturalWidth;
    canvas.height = base.naturalHeight;

    // lê o atlas uma vez: R = brilho da unha real (codificado em raiz quadrada, 0 a 4), G = máscara
    const ac = document.createElement('canvas');
    ac.width = atlas.naturalWidth; ac.height = atlas.naturalHeight;
    const actx = ac.getContext('2d', { willReadFrequently: true });
    actx.drawImage(atlas, 0, 0);
    const ad = actx.getImageData(0, 0, ac.width, ac.height).data;
    const nails = data.map((d) => {
      const n = d.w * d.h, S = new Float32Array(n), M = new Float32Array(n);
      for (let j = 0; j < d.h; j++) {
        for (let i = 0; i < d.w; i++) {
          const q = ((d.ay + j) * ac.width + i) * 4, k = j * d.w + i, r = ad[q] / 255;
          S[k] = r * r * 4; M[k] = ad[q + 1] / 255;
        }
      }
      const lc = document.createElement('canvas'); lc.width = d.w; lc.height = d.h;
      const rad = (d.a * Math.PI) / 180;
      return {
        d, S, M, lc, lctx: lc.getContext('2d'),
        out: new ImageData(d.w, d.h), A: new Float32Array(n), colC: new Float32Array(d.w), colH: new Float32Array(d.w),
        hV: new Float32Array(d.w), hS: new Float32Array(d.w), hAm: new Float32Array(d.w),
        k: d.hw / 50, cos: Math.cos(rad), sin: Math.sin(rad), nude: d.nude.map((c, i) => c * 1.3 * 0.45 + [0.8, 0.52, 0.47][i] * 0.55),
      };
    });
    // bordas reais de cada coluna (com subpixel) e as retas das laterais que o alongamento continua
    nails.forEach((nl) => {
      const d = nl.d, W = d.w, Hh = d.h, M = nl.M;
      nl.rTop = new Float32Array(W); nl.rBot = new Float32Array(W);
      for (let i = 0; i < W; i++) {
        let j0 = -1, j1 = -1;
        for (let j = 0; j < Hh; j++) if (M[j * W + i] > 0.5) { if (j0 < 0) j0 = j; j1 = j; }
        if (j0 < 1 || j1 >= Hh - 1) { nl.rTop[i] = NaN; nl.rBot[i] = NaN; continue; }
        const a0 = M[j0 * W + i], p0 = M[(j0 - 1) * W + i], a1 = M[j1 * W + i], p1 = M[(j1 + 1) * W + i];
        nl.rTop[i] = d.vmin + j0 + 0.5 - (a0 - 0.5) / Math.max(1e-3, a0 - p0);
        nl.rBot[i] = d.vmin + j1 + 0.5 + (a1 - 0.5) / Math.max(1e-3, a1 - p1);
      }
      const sd = d.side;
      nl.lineT = (u) => sd.aT + sd.bT * u;
      nl.lineB = (u) => sd.aB + sd.bB * u;
      nl.c0 = (nl.lineT(d.N) + nl.lineB(d.N)) / 2;
      nl.Wd = (nl.lineB(d.N) - nl.lineT(d.N)) / 2;
      // perfil mais suave para a ponta do alongamento
      const P = d.P, r = 7;
      nl.Psoft = P.map((_, i) => { let s = 0, c = 0; for (let k = -r; k <= r; k++) { const q = i + k; if (q >= 0 && q < P.length) { s += P[q]; c++; } } return s / c; });
    });

    const state = { ...SHAPES.amendoa, ext: LENGTHS.media, color: '#6B1832', finish: 'liso', gems: false };
    const WHITE = [1, 1, 1], GOLD = [1, 0.78, 0.42];

    function drawNail(nl) {
      const { d, S, M, A, colC, colH, k } = nl;
      const W = d.w, Hh = d.h, N = d.N;
      const L = N + state.ext * k;
      const T = Math.min(state.T * nl.Wd, L - N * 0.35);
      const us = L - T;
      const geo = { L };
      const uA = 0.5 * N, uB = 0.8 * N;

      // 1. bordas de cada coluna: até uA a máscara real (cutícula e laterais); depois a lateral real
      //    vira suavemente a reta do alongamento; na ponta, o perfil do formato estreita a partir dela.
      const edges = (u, i) => {
        let t = nl.lineT(u), b = nl.lineB(u);
        if (u < uB) {
          const rt = nl.rTop[i], rb = nl.rBot[i];
          if (rt === rt) { const s = smooth((u - uA) / (uB - uA)); t = rt + (t - rt) * s; b = rb + (b - rb) * s; }
        }
        if (u > us) {
          const g = profile(state, (u - us) / T), c = (t + b) / 2, hh = (b - t) / 2;
          t = c - hh * g; b = c + hh * g;
        }
        return [t, b];
      };
      const SUB = [-0.375, -0.125, 0.125, 0.375];
      for (let i = 0; i < W; i++) {
        const u = d.umin + i + 0.5;
        if (u <= uA) {
          for (let j = 0; j < Hh; j++) A[j * W + i] = M[j * W + i];
          const rt = nl.rTop[i];
          colC[i] = rt === rt ? (rt + nl.rBot[i]) / 2 : 0;
          colH[i] = rt === rt ? (nl.rBot[i] - rt) / 2 : 0;
          continue;
        }
        if (u - 0.5 > L) { for (let j = 0; j < Hh; j++) A[j * W + i] = 0; colH[i] = 0; continue; }
        // perto da ponta, 4 amostras por coluna para a borda ficar lisa
        const subs = u > us - 1 ? SUB : [0];
        for (let j = 0; j < Hh; j++) A[j * W + i] = 0;
        for (const du of subs) {
          const uu = u + du;
          if (uu > L) continue;
          const [t, b] = edges(uu, i);
          if (b - t <= 0) continue;
          const j0 = Math.max(0, Math.floor(t - d.vmin)), j1 = Math.min(Hh - 1, Math.ceil(b - d.vmin));
          for (let j = j0; j <= j1; j++) {
            const v = d.vmin + j + 0.5;
            const cov = Math.max(0, Math.min(1, v - t + 0.5)) * Math.max(0, Math.min(1, b - v + 0.5));
            A[j * W + i] += cov / subs.length;
          }
        }
        // ponta reta (ballerina/quadrado): corte limpo no fim
        if (u + 0.5 > L) { const f = Math.max(0, L - (u - 0.5)); for (let j = 0; j < Hh; j++) A[j * W + i] *= f; }
        const [t, b] = edges(u, i);
        colC[i] = (t + b) / 2; colH[i] = Math.max(0, (b - t) / 2);
      }

      // reflexo de gel: segue a linha onde a luz bate na unha real; no alongamento acompanha o formato
      const hl = d.hl, hA = hl.A, iRef = Math.min(hA.length - 1, Math.round(0.8 * N - d.umin));
      const uRef = d.umin + iRef + 0.5, vnRef = (hl.a + hl.b * uRef - nl.c0) / nl.Wd;
      const hV = nl.hV, hS = nl.hS, hAm = nl.hAm;
      for (let i = 0; i < W; i++) {
        const u = d.umin + i + 0.5;
        const vReal = hl.a + hl.b * u;
        let amp = i < iRef ? hA[i] : hA[iRef];
        if (u > N) amp *= 1 - 0.3 * Math.min(1, (u - N) / (geo.L - N + 1));
        const wv = smooth((u - 0.8 * N) / (0.25 * N));
        if (wv > 0 && colH[i] > 0) {
          hV[i] = vReal + (colC[i] + vnRef * colH[i] - vReal) * wv;
          hS[i] = hl.sig * (1 + (Math.max(0.35, colH[i] / nl.Wd) - 1) * wv);
        } else { hV[i] = vReal; hS[i] = hl.sig; }
        hAm[i] = amp;
      }

      // 2. cor: a mesma luz da unha real, com a cor e o acabamento escolhidos
      const C = hexLin(state.color), nude = nl.nude, P = d.P, PL = P.length - 1;
      const fin = state.finish;
      const u55 = 0.55 * N, u90 = 0.9 * N;
      const c0 = nl.c0, Wd = nl.Wd;
      // francesinha: a ponta branca começa perto da borda livre da unha natural, com o sorriso curvo
      const smileU = Math.max(N * 0.8, Math.min(N * 0.97, L - Wd * 0.45)), smileD = Wd * 0.34;
      const specK = fin === 'cromado' ? 1.1 : fin === 'glitter' ? 0.75 : 0.88;
      const o = nl.out.data;
      for (let j = 0; j < Hh; j++) {
        const v = d.vmin + j + 0.5, vn2 = ((v - c0) / Wd) * ((v - c0) / Wd);
        for (let i = 0; i < W; i++) {
          const idx = j * W + i, p4 = idx * 4, a = A[idx];
          if (a <= 0.003) { o[p4 + 3] = 0; continue; }
          const u = d.umin + i + 0.5;
          // brilho: real no começo da unha, prolongado pelo perfil no alongamento
          let wr = u <= u55 ? 1 : u >= u90 ? 0 : smooth((u90 - u) / (u90 - u55));
          wr *= Math.min(1, M[idx] * 1.25);
          let syn = 0.6;
          if (colH[i] > 0) {
            let x = (((v - colC[i]) / colH[i]) + 1) * 0.5 * PL;
            x = x < 0 ? 0 : x > PL ? PL : x;
            const x0 = x | 0, f = x - x0;
            syn = P[x0] + (P[Math.min(PL, x0 + 1)] - P[x0]) * f;
          }
          // na ponta o reflexo fica mais suave e um pouco mais fraco
          const tipF = u > N ? Math.min(1, (u - N) / (geo.L - N + 1)) : 0;
          if (tipF > 0 && colH[i] > 0) {
            let x = (((v - colC[i]) / colH[i]) + 1) * 0.5 * PL;
            x = x < 0 ? 0 : x > PL ? PL : x;
            const x0 = x | 0, f = x - x0, ps = nl.Psoft;
            syn += (ps[x0] + (ps[Math.min(PL, x0 + 1)] - ps[x0]) * f - syn) * tipF;
          }
          syn = 1 + (syn - 1) * (1 - 0.3 * tipF);
          let s = wr * S[idx] + (1 - wr) * syn * (1 + (hash(i, j, 3) - 0.5) * 0.05);
          let D, spec;
          if (fin === 'cromado') {
            D = s < 1 ? s : Math.min(1.22, 1 + (s - 1) * 0.12);
            spec = s > 1.15 ? specK * (1 - Math.exp(-(s - 1.15) / 1.4)) : 0;
          } else {
            D = s < 1 ? s : Math.min(1.12, 1 + (s - 1) * 0.06);
            const dv = (v - hV[i]) / hS[i], d2 = dv * dv;
            spec = specK * hAm[i] * (0.72 * Math.exp(-0.5 * d2 * d2) + 0.28 * Math.exp(-0.5 * d2) + 0.035 * Math.exp(-0.08 * d2));
          }

          // cor do material em cada ponto
          let r, g, b;
          if (fin === 'francesinha') {
            const ft = Math.max(0, Math.min(1, u - (smileU - smileD * Math.min(1, vn2)) + 0.5));
            r = nude[0] + (C[0] - nude[0]) * ft; g = nude[1] + (C[1] - nude[1]) * ft; b = nude[2] + (C[2] - nude[2]) * ft;
          } else if (fin === 'boomer') {
            const t = smooth((u - 0.32 * L) / (0.62 * L));
            r = nude[0] + (C[0] - nude[0]) * t; g = nude[1] + (C[1] - nude[1]) * t; b = nude[2] + (C[2] - nude[2]) * t;
          } else { r = C[0]; g = C[1]; b = C[2]; }

          let R, G, B;
          if (fin === 'cromado') {
            const t = Math.pow(smooth((s - 0.45) / 2.6), 0.85);
            const mr = r + (1 - r) * 0.6, mg = g + (1 - g) * 0.6, mb = b + (1 - b) * 0.6;
            R = r * 0.22 * D + mr * t * 1.25 + spec; G = g * 0.22 * D + mg * t * 1.25 + spec; B = b * 0.22 * D + mb * t * 1.25 + spec;
          } else {
            R = r * D + spec; G = g * D + spec; B = b * D + spec;
          }
          if (fin === 'glitter') {
            const h = hash(i, j, 7);
            if (h > 0.962) {
              const tint = hash(i, j, 11) > 0.72 ? GOLD : WHITE;
              const amp = (h - 0.962) / 0.038 * (0.25 + 0.55 * Math.min(s, 3));
              R += tint[0] * amp; G += tint[1] * amp; B += tint[2] * amp;
            } else {
              const fl = (hash(i >> 1, j >> 1, 5) - 0.5) * 0.12;
              R *= 1 + fl; G *= 1 + fl; B *= 1 + fl;
            }
          }
          o[p4] = enc(R); o[p4 + 1] = enc(G); o[p4 + 2] = enc(B); o[p4 + 3] = a * 255;
        }
      }
      nl.lctx.putImageData(nl.out, 0, 0);
      ctx.setTransform(nl.cos, nl.sin, -nl.sin, nl.cos, d.ox, d.oy);
      ctx.drawImage(nl.lc, d.umin, d.vmin);
      if (state.gems && d.ring) {
        ctx.setTransform(nl.cos * k, nl.sin * k, -nl.sin * k, nl.cos * k, d.ox, d.oy);
        drawGems(ctx);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    function drawGems(c) {
      const stones = [[30, -2, 11], [23, -22, 7.5], [23, 18, 7.5], [44, -13, 5.6], [44, 9, 5.6], [54, -2, 4.4]];
      stones.forEach(([x, y, r]) => {
        c.save();
        c.shadowColor = 'rgba(0,0,0,0.45)'; c.shadowBlur = 4; c.shadowOffsetY = 1.5;
        const g = c.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
        g.addColorStop(0, '#ffffff'); g.addColorStop(0.45, '#e8eef7'); g.addColorStop(0.8, '#a9b4c6'); g.addColorStop(1, '#7e889b');
        c.fillStyle = g; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill();
        c.restore();
        c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 0.6;
        c.beginPath(); c.moveTo(x - r * 0.6, y); c.lineTo(x + r * 0.6, y); c.moveTo(x, y - r * 0.6); c.lineTo(x, y + r * 0.6); c.stroke();
      });
      c.fillStyle = 'rgba(255,255,255,0.95)';
      c.beginPath();
      const sx = 26, sy = -6;
      c.moveTo(sx, sy - 9); c.quadraticCurveTo(sx, sy, sx + 9, sy); c.quadraticCurveTo(sx, sy, sx, sy + 9);
      c.quadraticCurveTo(sx, sy, sx - 9, sy); c.quadraticCurveTo(sx, sy, sx, sy - 9); c.fill();
    }

    function render() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(base, 0, 0);
      nails.forEach(drawNail);
    }

    function set(next, animate) {
      const target = {};
      if (next.shape) Object.assign(target, SHAPES[next.shape]);
      if (next.len) target.ext = LENGTHS[next.len];
      ['color', 'finish', 'gems'].forEach((key) => { if (key in next) state[key] = next[key]; });
      if (animate && window.gsap && Object.keys(target).length) {
        window.gsap.to(state, { ...target, duration: 0.75, ease: 'power3.inOut', overwrite: 'auto', onUpdate: render });
      } else {
        Object.assign(state, target);
      }
      render();
    }

    // termina na hora qualquer troca de formato em andamento (para a imagem do pedido)
    function settle() {
      if (window.gsap) window.gsap.getTweensOf(state).forEach((t) => t.progress(1));
      render();
    }

    render();
    return { set, render, settle, state };
  }

  window.NailStudio = NailStudio;
  window.NailStudio.SHAPES = SHAPES;
  window.NailStudio.LENGTHS = LENGTHS;
  window.NailStudio.DATA = DATA;
})();
