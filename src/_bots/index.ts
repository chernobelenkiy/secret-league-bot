if (process.env.ENKIY === '1') {
  require('./enkiyBoy');
}

if (process.env.PSYCHO === '1') {
  require('./psychoBot');
}

if (process.env.MEDATION === '1') {
  require('./MediationBot');
}
