import Swal from 'sweetalert2'

export const showSuccessAlert = (title, text, showBagButton = false) => {
  return Swal.fire({
    title: title,
    text: text,
    iconHtml: '<i class="pi pi-check-circle"></i>',
    customClass: {
      icon: 'custom-success-icon',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    showConfirmButton: true,
    showCancelButton: showBagButton,
    cancelButtonText: 'Continue Shopping',
    confirmButtonColor: '#E74C3C',
    cancelButtonColor: '#95a5a6',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
    if (result.isConfirmed && showBagButton) {
    router.push({ name: 'BagPage' })
  }
}

export const showErrorAlert = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    // The centering fix is primarily in the CSS, but adding a zeroed padding style here
    // can help override potential inline padding issues, ensuring perfect center.
    iconHtml: '<i class="pi pi-times-circle" style="padding-left: 0 !important;"></i>', 
    customClass: {
      icon: 'custom-error-icon',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    confirmButtonText: 'OK',
    confirmButtonColor: '#E74C3C',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__shakeX'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showConfirmationAlert = (title, text, confirmText = 'Confirm', showCancelButton = true) => {
  return Swal.fire({
    title: title,
    text: text,
    iconHtml: '<i class="pi pi-question"></i>',
    customClass: {
      icon: 'custom-question-icon',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button'
    },
    showCancelButton: showCancelButton,
    confirmButtonColor: '#E74C3C',
    cancelButtonColor: '#95a5a6',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancel',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showWarningAlert = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    iconHtml: '<i class="pi pi-exclamation-triangle"></i>',
    customClass: {
      icon: 'custom-warning-icon',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    confirmButtonText: 'OK',
    confirmButtonColor: '#f39c12',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showInfoAlert = (title, text) => {
  return Swal.fire({
    title: title,
    text: text,
    iconHtml: '<i class="pi pi-info-circle"></i>',
    customClass: {
      icon: 'custom-info-icon',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    confirmButtonText: 'OK',
    confirmButtonColor: '#3498db',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showOrderSuccessAlert = (orderCode, totalAmount) => {
  return Swal.fire({
    title: 'Order Completed!',
    html: `
      <div style="text-align: center;">
        <i class="pi pi-shopping-cart" style="font-size: 48px; color: #27ae60; margin-bottom: 16px;"></i>
        <p style="margin: 8px 0; color: #2c3e50;">Your order has been successfully placed!</p>
        <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0; font-weight: bold; color: #E74C3C;">Order Code: ${orderCode}</p>
          <p style="margin: 4px 0; color: #2c3e50;">Total Amount: ₱${totalAmount.toFixed(2)}</p>
        </div>
        <p style="margin: 8px 0; font-size: 12px; color: #7f8c8d;">Please save your order code for reference.</p>
      </div>
    `,
    customClass: {
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    confirmButtonText: 'Continue Shopping',
    confirmButtonColor: '#E74C3C',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__bounceIn'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showProductAddedAlert = (productName, showViewBagButton = true) => {
  return Swal.fire({
    title: 'Added to Bag!',
    html: `
      <div style="text-align: center;">
        <i class="pi pi-check-circle" style="font-size: 48px; color: #27ae60; margin-bottom: 16px;"></i>
        <p style="margin: 8px 0; color: #2c3e50;"><strong>${productName}</strong> has been added to your bag.</p>
      </div>
    `,
    customClass: {
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button',
      cancelButton: 'custom-cancel-button'
    },
    showCancelButton: showViewBagButton,
    confirmButtonText: showViewBagButton ? 'View Bag' : 'Continue Shopping',
    cancelButtonText: 'Continue Shopping',
    confirmButtonColor: '#E74C3C',
    cancelButtonColor: '#95a5a6',
    buttonsStyling: true,
    timer: showViewBagButton ? null : 2000,
    timerProgressBar: !showViewBagButton,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showLoginAlert = (message, isError = false) => {
  const icon = isError ? 'pi-times-circle' : 'pi-info-circle'
  const iconClass = isError ? 'custom-error-icon' : 'custom-info-icon'
  const color = isError ? '#E74C3C' : '#3498db'

  return Swal.fire({
    title: isError ? 'Login Error' : 'Login Information',
    text: message,
    iconHtml: `<i class="pi ${icon}"></i>`,
    customClass: {
      icon: iconClass,
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    confirmButtonText: 'OK',
    confirmButtonColor: color,
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

export const showStockAlert = (productName, availableLocations) => {
  const locationsText = availableLocations.length > 0
    ? `Available at: ${availableLocations.join(', ')}`
    : 'Currently out of stock at all locations'

  return Swal.fire({
    title: 'Stock Information',
    html: `
      <div style="text-align: center;">
        <i class="pi pi-exclamation-triangle" style="font-size: 48px; color: #f39c12; margin-bottom: 16px;"></i>
        <p style="margin: 8px 0; color: #2c3e50;"><strong>${productName}</strong></p>
        <p style="margin: 8px 0; color: #7f8c8d; font-size: 14px;">${locationsText}</p>
      </div>
    `,
    customClass: {
      icon: 'custom-warning-icon',
      title: 'custom-title',
      content: 'custom-content',
      confirmButton: 'custom-confirm-button'
    },
    confirmButtonText: 'OK',
    confirmButtonColor: '#f39c12',
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
}

// Toast notifications for less intrusive feedback
export const showToast = (title, message, type = 'info') => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const iconMap = {
    success: 'pi-check-circle',
    error: 'pi-times-circle',
    warning: 'pi-exclamation-triangle',
    info: 'pi-info-circle'
  }

  const iconColorMap = {
    success: '#27ae60',
    error: '#E74C3C',
    warning: '#f39c12',
    info: '#3498db'
  }

  return Toast.fire({
    iconHtml: `<i class="pi ${iconMap[type]}" style="color: ${iconColorMap[type]};"></i>`,
    title: title,
    text: message,
    customClass: {
      icon: `custom-toast-icon custom-toast-${type}`,
      title: 'custom-toast-title'
    }
  })
}

// CRITICAL FIX: Add a null check to ensure Swal.defaults exists before using Object.assign.
export const setGlobalSwalDefaults = () => {
    if (Swal && typeof Swal.defaults === 'object' && Swal.defaults !== null) {
        Object.assign(Swal.defaults, {
            customClass: {
                popup: 'custom-popup',
                header: 'custom-header',
                title: 'custom-title',
                content: 'custom-content',
                actions: 'custom-actions',
                confirmButton: 'custom-confirm-button',
                cancelButton: 'custom-cancel-button',
                footer: 'custom-footer'
            },
            buttonsStyling: true,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: true,
            focusConfirm: false
        });
    } else {
        // Fallback for cases where defaults aren't ready (this warning is safe)
        console.warn("SweetAlert2 defaults could not be set. Swal.defaults is not available yet.");
    }
};