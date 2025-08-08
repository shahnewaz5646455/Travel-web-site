import Swal from 'sweetalert2';

export const showBookingSuccessAlert = () => {
  Swal.fire({
    title: 'Booking Successful! 🎉',
    text: 'Your booking has been confirmed. Get ready for your adventure!',
    icon: 'success',
    confirmButtonText: 'Awesome!',
    confirmButtonColor: '#3085d6',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `,
    timer: 3000,
    timerProgressBar: true,
  });
};
