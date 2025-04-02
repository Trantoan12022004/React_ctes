import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EventRegistrationList.scss"; // Tạo file SCSS riêng cho component

class EventRegistrationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRow: null,
            filterStatus: 'all',
            filterPayment: 'all',
            searchTerm: '',
        };
    }

    // Toggle mở rộng hàng
    toggleRow = (id) => {
        this.setState(prevState => ({
            expandedRow: prevState.expandedRow === id ? null : id
        }));
    }

    // Format date
    formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("vi-VN");
    }

    // Format cost to VND
    formatCost = (cost) => {
        if (!cost) return "0 VND";
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(parseFloat(cost));
    };

    // Lọc danh sách đăng ký
    getFilteredRegistrations = () => {
        const { eventRegistrationData } = this.props;
        const { filterStatus, filterPayment, searchTerm } = this.state;

        if (!eventRegistrationData || !Array.isArray(eventRegistrationData) || eventRegistrationData.length === 0) {
            return [];
        }

        return eventRegistrationData.filter(reg => {
            // Lọc theo trạng thái thanh toán
            if (filterStatus !== 'all' && reg.statusCostCode !== filterStatus) {
                return false;
            }

            // Lọc theo phương thức thanh toán
            if (filterPayment !== 'all' && reg.payMethodCode.toLowerCase() !== filterPayment.toLowerCase()) {
                return false;
            }

            // Tìm kiếm theo tên, email hoặc số điện thoại
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                return (
                    reg.name.toLowerCase().includes(searchLower) ||
                    reg.email.toLowerCase().includes(searchLower) ||
                    reg.phoneNumber.includes(searchLower)
                );
            }

            return true;
        });
    }

    // Xử lý thay đổi bộ lọc
    handleFilterChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Render biểu đồ tiến trình đăng ký
    renderProgressBar = () => {
        const { eventData } = this.props;
        if (!eventData) return null;

        const registrationCount = eventData.registrationCount || 0;
        const quantityMember = eventData.quantityMember || 0;
        const percentage = quantityMember > 0 ? Math.round((registrationCount / quantityMember) * 100) : 0;
        
        let progressColor = "bg-success";
        if (percentage > 80) progressColor = "bg-danger";
        else if (percentage > 50) progressColor = "bg-warning";

        return (
            <div className="registration-progress">
                <div className="progress-info">
                    <span>Tiến độ đăng ký: <strong>{percentage}%</strong></span>
                    <span>({registrationCount}/{quantityMember})</span>
                </div>
                <div className="progress">
                    <div 
                        className={`progress-bar ${progressColor}`}
                        role="progressbar"
                        style={{ width: `${percentage}%` }}
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {percentage}%
                    </div>
                </div>
            </div>
        );
    }

    // Hiển thị bảng thống kê nhanh
    renderSummaryStats = () => {
        const { eventRegistrationData } = this.props;
        if (!eventRegistrationData || !Array.isArray(eventRegistrationData) || eventRegistrationData.length === 0) return null;

        const registrations = eventRegistrationData;
        const totalRegistered = registrations.length;
        const paid = registrations.filter(reg => reg.statusCostCode === 'PS1').length;
        const unpaid = registrations.filter(reg => reg.statusCostCode === 'PS2').length;
        const cashPayments = registrations.filter(reg => reg.payMethodCode.toLowerCase() === 'pm1').length;
        const bankPayments = registrations.filter(reg => reg.payMethodCode.toLowerCase() === 'pm2').length;

        return (
            <div className="summary-stats">
                <div className="stats-row">
                    <div className="stat-card total">
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{totalRegistered}</div>
                            <div className="stat-label">Tổng số đăng ký</div>
                        </div>
                    </div>
                    <div className="stat-card paid">
                        <div className="stat-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{paid}</div>
                            <div className="stat-label">Đã thanh toán</div>
                        </div>
                    </div>
                    <div className="stat-card unpaid">
                        <div className="stat-icon">
                            <i className="fas fa-clock"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{unpaid}</div>
                            <div className="stat-label">Chưa thanh toán</div>
                        </div>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="stat-card cash">
                        <div className="stat-icon">
                            <i className="fas fa-money-bill"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{cashPayments}</div>
                            <div className="stat-label">Tiền mặt</div>
                        </div>
                    </div>
                    <div className="stat-card bank">
                        <div className="stat-icon">
                            <i className="fas fa-university"></i>
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{bankPayments}</div>
                            <div className="stat-label">Chuyển khoản</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { eventData, eventRegistrationData } = this.props;  
        const { expandedRow, filterStatus, filterPayment, searchTerm } = this.state;

        if (!eventData || !eventRegistrationData) {
            return (
                <div className="loading-container">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang tải...</span>
                    </div>
                </div>
            );
        }

        const filteredRegistrations = this.getFilteredRegistrations();

        return (
            <div className="event-registration-container">
                <div className="container-fuild">
                    {/* Thông tin tổng quan sự kiện */}
                    <div className="event-summary-card">
                        
                            <div className="card-header">
                                <h3>Thông tin tổng quan sự kiện</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {this.renderProgressBar()}
                                    </div>
                                </div>
                                
                                {/* Thống kê nhanh */}
                                {this.renderSummaryStats()}
                            </div>
                        
                    </div>

                    {/* Bộ lọc danh sách đăng ký */}
                    <div className="registration-filter-container ">
                        
                            <div className="card-header">
                                <h3>Lọc danh sách</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Tìm kiếm:</label>
                                            <div className="search-input">
                                                <i className="fas fa-search"></i>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Tên, email, số điện thoại..." 
                                                    name="searchTerm"
                                                    value={searchTerm}
                                                    onChange={this.handleFilterChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Trạng thái thanh toán:</label>
                                            <select 
                                                className="form-select" 
                                                name="filterStatus"
                                                value={filterStatus}
                                                onChange={this.handleFilterChange}
                                            >
                                                <option value="all">Tất cả</option>
                                                <option value="PS1">Đã thanh toán</option>
                                                <option value="PS2">Chưa thanh toán</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Phương thức thanh toán:</label>
                                            <select 
                                                className="form-select" 
                                                name="filterPayment"
                                                value={filterPayment}
                                                onChange={this.handleFilterChange}
                                            >
                                                <option value="all">Tất cả</option>
                                                <option value="PM1">Tiền mặt</option>
                                                <option value="PM2">Chuyển khoản</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                    </div>

                    {/* Bảng danh sách người đăng ký */}
                    <div className="registration-table-container">
                        
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3>Danh sách người đăng ký ({filteredRegistrations.length})</h3>
                                    <button className="btn btn-success">
                                        <i className="fas fa-file-excel"></i> Xuất Excel
                                    </button>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    {filteredRegistrations.length > 0 ? (
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Người đăng ký</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Số điện thoại</th>
                                                    <th scope="col">Ngày đăng ký</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Phương thức</th>
                                                    <th scope="col">Chi tiết</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredRegistrations.map((registration, index) => (
                                                    <React.Fragment key={registration.id}>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{registration.name}</td>
                                                            <td>{registration.email}</td>
                                                            <td>{registration.phoneNumber}</td>
                                                            <td>{this.formatDate(registration.registeredAt)}</td>
                                                            <td>
                                                                <span className={`status-badge ${registration.statusCostCode === 'PS1' ? 'paid' : 'unpaid'}`}>
                                                                    {registration.statusCost.valueVi}
                                                                </span>
                                                            </td>
                                                            <td>{registration.payMethod.valueVi}</td>
                                                            <td>
                                                                <button 
                                                                    className="btn btn-sm btn-outline-primary"
                                                                    onClick={() => this.toggleRow(registration.id)}
                                                                >
                                                                    <i className={`fas fa-chevron-${expandedRow === registration.id ? 'up' : 'down'}`}></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                        {expandedRow === registration.id && (
                                                            <tr className="expanded-row">
                                                                <td colSpan="8">
                                                                    <div className="expanded-content">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="user-info">
                                                                                    <h5>Thông tin người dùng</h5>
                                                                                    <ul>
                                                                                        <li><strong>ID:</strong> {registration.userId}</li>
                                                                                        <li><strong>Họ:</strong> {registration.User?.firstName || '-'}</li>
                                                                                        <li><strong>Tên:</strong> {registration.User?.lastName || '-'}</li>
                                                                                        <li><strong>Địa chỉ:</strong> {registration.User?.address || '-'}</li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="note-info">
                                                                                    <h5>Ghi chú</h5>
                                                                                    <div className="note-content">
                                                                                        {registration.notes ? registration.notes : <em>Không có ghi chú</em>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="no-results">
                                            <i className="fas fa-search"></i>
                                            <p>Không tìm thấy kết quả phù hợp với bộ lọc.</p>
                                            {eventRegistrationData.length === 0 && (
                                                <p>Chưa có người đăng ký tham gia sự kiện này.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userInforr: state.user.userInforr,
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps)(EventRegistrationList);