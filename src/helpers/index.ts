export const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export const onImageError = (e) => {
  e.target.src = '/noimage.jpg';
  e.target.style.objectFit = 'cover';
};
