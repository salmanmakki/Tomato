import { useContext, useEffect, useState } from 'react'
import './Payment.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const { url, token } = useContext(StoreContext)
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState('pending') // pending, processing, success, failed

  useEffect(() => {
    // Get pending order from sessionStorage
    const pendingOrder = sessionStorage.getItem('pendingOrder')
    if (!pendingOrder) {
      navigate('/order')
      return
    }
    setOrderData(JSON.parse(pendingOrder))
  }, [])

  const handleUPIPayment = async () => {
    setPaymentStatus('processing')
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Place order
      const response = await axios.post(url + '/api/order/place', orderData, {
        headers: { token }
      })
      
      if (response.data.success) {
        setPaymentStatus('success')
        sessionStorage.removeItem('pendingOrder')
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/myorders')
        }, 2000)
      } else {
        setPaymentStatus('failed')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStatus('failed')
    }
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Complete Payment</h2>
        
        {orderData && (
          <>
            <div className="payment-summary">
              <h3>Order Summary</h3>
              <div className="payment-item">
                <span>Total Amount:</span>
                <span className="amount">₹{orderData.amount}</span>
              </div>
              <div className="payment-method">
                <span>Payment Method:</span>
                <span>{orderData.paymentMethod}</span>
              </div>
              {orderData.upiId && (
                <div className="payment-method">
                  <span>UPI ID:</span>
                  <span>{orderData.upiId}</span>
                </div>
              )}
            </div>

            {paymentStatus === 'pending' && (
              <div className="payment-actions">
                <button onClick={handleUPIPayment} className="pay-button">
                  Pay with UPI - ₹{orderData.amount}
                </button>
                <button onClick={() => navigate('/order')} className="cancel-button">
                  Cancel Order
                </button>
              </div>
            )}

            {paymentStatus === 'processing' && (
              <div className="payment-status">
                <div className="spinner"></div>
                <p>Processing your payment...</p>
              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="payment-status success">
                <div className="success-icon">✓</div>
                <h3>Payment Successful!</h3>
                <p>Your order has been placed.</p>
                <p>Redirecting to orders...</p>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="payment-status error">
                <div className="error-icon">✗</div>
                <h3>Payment Failed</h3>
                <p>Please try again or choose a different payment method.</p>
                <button onClick={() => setPaymentStatus('pending')}>Try Again</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Payment

