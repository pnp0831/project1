import DeviceDetector from 'device-detector-js';

export const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const onImageError = (e) => {
  e.target.src = '/noimage.jpg';
  e.target.style.objectFit = 'cover';
};

export const parseUserAgent = (userAgent) => {
  const deviceDetector = new DeviceDetector();

  const device = deviceDetector.parse(userAgent);

  return device;
};
