import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import ScrollToTop from '../../components/ScrollTop';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Contact.scss';
import Logo from '../../assets/images/logos/logo2.png';


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        setShowAlert(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div className="event-page">
            <Header
                parentMenu='contact'
                headerNormalLogo={Logo}
                headerStickyLogo={Logo}
            />

            <div className="react-wrapper">
                <div className="react-wrapper-inner">
                    <Breadcrumb
                        pageTitle="Liên Hệ Với Chúng Tôi"
                    />

                    <div className="contact-page-area pt-120 pb-120">
                        <Container>
                            {showAlert && (
                                <Alert variant="success" className="mb-4" onClose={() => setShowAlert(false)} dismissible>
                                    Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
                                </Alert>
                            )}

                            <Row>
                                {/* Thông tin liên hệ */}
                                <Col lg={4} md={12} className="mb-5 mb-lg-0">
                                    <div className="contact-info-box shadow p-4 rounded h-100">
                                        <h3 className="title-style mb-4">Thông Tin Liên Hệ</h3>
                                        <div className="address-box mb-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="icon-box me-3">
                                                    <FaMapMarkerAlt className="text-primary" size={24} />
                                                </div>
                                                <div className="content">
                                                    <h5 className="mb-1">Địa Chỉ</h5>
                                                    <p className="mb-0">Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội, Việt Nam</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="icon-box me-3">
                                                    <FaPhoneAlt className="text-primary" size={24} />
                                                </div>
                                                <div className="content">
                                                    <h5 className="mb-1">Số Điện Thoại</h5>
                                                    <p className="mb-0">+84 123 456 789</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="icon-box me-3">
                                                    <FaEnvelope className="text-primary" size={24} />
                                                </div>
                                                <div className="content">
                                                    <h5 className="mb-1">Email</h5>
                                                    <p className="mb-0">contact@ctes.edu.vn</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="icon-box me-3">
                                                    <FaClock className="text-primary" size={24} />
                                                </div>
                                                <div className="content">
                                                    <h5 className="mb-1">Giờ Hoạt Động</h5>
                                                    <p className="mb-0">Thứ Hai - Thứ Sáu: 8:00 - 17:30</p>
                                                    <p className="mb-0">Thứ Bảy: 9:00 - 12:00</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="social-links mt-4">
                                            <h5 className="mb-3">Theo Dõi Chúng Tôi</h5>
                                            <div className="d-flex gap-3">
                                                <a href="#" className="social-icon bg-primary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px' }}>
                                                    <FaFacebookF />
                                                </a>
                                                <a href="#" className="social-icon bg-info text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px' }}>
                                                    <FaTwitter />
                                                </a>
                                                <a href="#" className="social-icon bg-danger text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px' }}>
                                                    <FaInstagram />
                                                </a>
                                                <a href="#" className="social-icon bg-secondary text-white d-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px' }}>
                                                    <FaLinkedinIn />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                                {/* Form liên hệ */}
                                <Col lg={8} md={12}>
                                    <div className="contact-form-box shadow p-4 rounded">
                                        <h3 className="title-style mb-4">Gửi Thông Điệp Cho Chúng Tôi</h3>
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group>
                                                        <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control 
                                                            type="text" 
                                                            name="name" 
                                                            value={formData.name} 
                                                            onChange={handleChange}
                                                            required 
                                                            placeholder="Nhập họ và tên của bạn" 
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6} className="mb-3">
                                                    <Form.Group>
                                                        <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control 
                                                            type="email" 
                                                            name="email" 
                                                            value={formData.email} 
                                                            onChange={handleChange}
                                                            required 
                                                            placeholder="Nhập địa chỉ email của bạn" 
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Tiêu đề <span className="text-danger">*</span></Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    name="subject" 
                                                    value={formData.subject} 
                                                    onChange={handleChange}
                                                    required 
                                                    placeholder="Nhập tiêu đề" 
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Form.Label>Nội dung <span className="text-danger">*</span></Form.Label>
                                                <Form.Control 
                                                    as="textarea" 
                                                    name="message" 
                                                    value={formData.message} 
                                                    onChange={handleChange}
                                                    rows={5} 
                                                    required 
                                                    placeholder="Nhập nội dung tin nhắn của bạn" 
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="btn-lg">
                                                Gửi Thông Điệp
                                            </Button>
                                        </Form>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    {/* Bản đồ */}
                    <div className="map-area">
                        <div className="google-map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.696199620255!2d105.84083267499552!3d21.006173280636823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2zxJDhuqFpIEjhu41jIELDoWNoIEtob2EgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1684912252022!5m2!1svi!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="faq-section pt-100 pb-70">
                        <Container>
                            <div className="text-center mb-5">
                                <h2 className="section-title">Câu Hỏi Thường Gặp</h2>
                                <p className="section-description">Những thông tin hữu ích bạn có thể cần</p>
                            </div>
                            
                            <Row>
                                <Col lg={6} className="mb-4">
                                    <div className="faq-item shadow p-4 rounded h-100">
                                        <h5 className="mb-3">Làm thế nào để tôi đăng ký tham gia sự kiện?</h5>
                                        <p>
                                            Để đăng ký tham gia sự kiện, bạn cần tạo tài khoản trên hệ thống CTES, 
                                            sau đó truy cập trang "Sự kiện" và chọn sự kiện mong muốn. Nhấn vào nút 
                                            "Đăng ký" và hoàn thành các thông tin cần thiết.
                                        </p>
                                    </div>
                                </Col>
                                <Col lg={6} className="mb-4">
                                    <div className="faq-item shadow p-4 rounded h-100">
                                        <h5 className="mb-3">Làm thế nào để tôi có thể trở thành tình nguyện viên?</h5>
                                        <p>
                                            Để trở thành tình nguyện viên, bạn cần đăng ký tài khoản, hoàn thiện hồ sơ 
                                            cá nhân và gửi đơn đăng ký tình nguyện viên. Chúng tôi sẽ xem xét và liên hệ 
                                            với bạn trong thời gian sớm nhất.
                                        </p>
                                    </div>
                                </Col>
                                <Col lg={6} className="mb-4">
                                    <div className="faq-item shadow p-4 rounded h-100">
                                        <h5 className="mb-3">Tôi có thể hủy đăng ký tham gia sự kiện không?</h5>
                                        <p>
                                            Có, bạn có thể hủy đăng ký tham gia sự kiện trước thời hạn đóng đăng ký. 
                                            Vui lòng truy cập vào trang "Hồ sơ cá nhân" > "Sự kiện đã đăng ký" và chọn 
                                            "Hủy đăng ký" cho sự kiện tương ứng.
                                        </p>
                                    </div>
                                </Col>
                                <Col lg={6} className="mb-4">
                                    <div className="faq-item shadow p-4 rounded h-100">
                                        <h5 className="mb-3">Làm thế nào để nhận thông báo về sự kiện mới?</h5>
                                        <p>
                                            Bạn có thể đăng ký nhận thông báo về sự kiện mới bằng cách bật tùy chọn "Nhận 
                                            thông báo" trong phần "Cài đặt thông báo" của tài khoản. Chúng tôi sẽ gửi email 
                                            thông báo khi có sự kiện mới.
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    {/* scrolltop-start */}
                    <ScrollToTop />
                    {/* scrolltop-end */}
                </div>
            </div>

            <Footer />

        </div>
    );
}

export default Contact;