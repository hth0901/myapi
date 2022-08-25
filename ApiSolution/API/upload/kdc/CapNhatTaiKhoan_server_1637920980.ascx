<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CapNhatTaiKhoan.ascx.cs" Inherits="HueCIT.Modules.SSOQuanLyTaiKhoan.CapNhatTaiKhoan" %>
<%@ Register TagPrefix="dnn" Assembly="DotNetNuke" Namespace="DotNetNuke.UI.WebControls"%>
<%@ Register TagPrefix="dnn" Assembly="DotNetNuke.Web" Namespace="DotNetNuke.Web.UI.WebControls" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<dnn:DnnCssInclude runat="server" FilePath="~/DesktopModules/SSOQuanLyTaiKhoan/css/select2.css" ForceProvider="DnnPageHeaderProvider"/>
<dnn:DnnJsInclude runat="server" FilePath="~/DesktopModules/SSOQuanLyTaiKhoan/Js/select2.js" ForceProvider="DnnPageHeaderProvider"/>
<style>
	input[type='text'], input[type='password'], select{width:100%;}
	td {white-space:nowrap;}
    .error {color:red;display:block;}
    span[style*="hidden;"] {display:none;}
    .update_panel {display:inline;}
    .error_block {color: red;display: block;}
    .captcha input {width:150px;margin-left:10px;padding-top:5px;padding-bottom:5px;}
    .captcha div {display:none;}
    .captcha{margin-bottom:5px;}
    .captcha_error{display:none;}
    input.dnnFormNoRequired, textarea.dnnFormNoRequired, select.dnnFormNoRequired {margin-left: -5px;}
    input.dnnFormRequired, textarea.dnnFormRequired, select.dnnFormRequired {margin-left: -5px;border-left:1px solid #bfbfbf !important;}
    .dnnFormRequired {border-left:none !important;}
    span.required_field {color:red;}
</style>
<%--<h3><%=LocalizeString("lblDangKyThanhVien")%></h3>--%>
<div runat="server" id="moduleMessage"></div>
<div>
<h2 id="H3" class="dnnFormSectionHead dnnClear">
    <asp:HyperLink runat="server" ID="lnkAddNew" CssClass="dnnSectionExpanded" Text="Tạo mới tài khoản"></asp:HyperLink>
</h2>
<table class="table">
    <tr><td colspan="2"><span class='required_field'>(*)</span> là thông tin bắt buộc nhập</td></tr>
    <asp:Panel runat="server" ID="pnlThongTinTaiKhoan">
	<tr>
		<td colspan="2"><strong>Thông tin tài khoản</strong></td>
	</tr>
	<tr>
		<td style="width:10%">Loại tài khoản</td>`
		<td>
			<asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddlLoaiTaiKhoan" AutoPostBack="true" OnSelectedIndexChanged="ddlLoaiTaiKhoan_SelectedIndexChanged">
			</asp:DropDownList>
		</td>
	</tr>
    <tr runat="server" id="trOwnerCode" visible="false">
		<td style="width:10%">Thuộc đơn vị</td>
		<td>
            <asp:DropDownList runat="server" ID="ddlOwnerCode" DataValueField="MaDonVi" DataTextField="TenDonVi" style="width:100%;"></asp:DropDownList>
		</td>
	</tr>
    <tr>
		<td style="width:10%">Vai trò</td>
		<td>
			<asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddlVaiTro"></asp:DropDownList>
            <%--<asp:CheckBoxList runat="server" ID="cblVaiTro"></asp:CheckBoxList>--%>
		</td>
	</tr>
	<tr>
		<td>Tên đăng nhập</td>
		<td>
			<asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtTenDangNhap"></asp:TextBox>
			<asp:RequiredFieldValidator runat="server" ID="rfvTxtTenDangNhap" ControlToValidate="txtTenDangNhap" resourcekey="rfvTxtTenDangNhap"
				CssClass="error">
			</asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator runat="server" ID="revTxtTenDangNhap" ControlToValidate="txtTenDangNhap" resourcekey="revTxtTenDangNhap"
               CssClass="error" ValidationExpression="^[a-zA-Z0-9._]{3,30}$">
            </asp:RegularExpressionValidator>
		</td>
	</tr>
    <tr runat="server" id="trPassword">
		<td>Mật khẩu</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" TextMode="Password" runat="server" ID="txtPassword"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvPassword" ControlToValidate="txtPassword" ErrorMessage="Mật khẩu phải khác rỗng"
				CssClass="error">
			</asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator runat="server" ID="revTxtPassword" ControlToValidate="txtPassword" resourcekey="revTxtPassword"
               CssClass="error" ValidationExpression="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$">
            </asp:RegularExpressionValidator>
		</td>
	</tr>
    <tr runat="server" id="trRePassword">
		<td>Xác nhận mật khẩu</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" TextMode="Password" runat="server" ID="txtRePassword"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvRePassword" ControlToValidate="txtRePassword" ErrorMessage="Xác nhận mật khẩu phải khác rỗng"
				CssClass="error">
			</asp:RequiredFieldValidator>
            <asp:CompareValidator runat="server" ID="CompareValidator1" ControlToValidate="txtRepassword" ControlToCompare="txtPassword" ErrorMessage="Mật khẩu xác nhận không hợp lệ"
                CssClass="error">
            </asp:CompareValidator>
		</td>
	</tr>    
    </asp:Panel>
    <asp:Panel runat="server" ID="pnlTC" Visible="false">
    <tr>
        <td colspan="2"><strong>Thông tin đơn vị</strong></td>
    </tr>
    <tr>
		<td><asp:Label runat="server" ID="lblMaToChucDonVi">Mã đơn vị</asp:Label></td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtMaDonVi"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvMaDonVi" ControlToValidate="txtMaDonVi" Text="Mã cơ quan bắt buộc nhập"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
    <tr>
		<td><asp:Label runat="server" ID="lblTenToChucDonVi"></asp:Label></td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtTCTen"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtTCTen" ControlToValidate="txtTCTen" resourcekey="rfvTxtTCTen"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
    <tr>
		<td>Email</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtTCEmail"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTCTxtEmail" ControlToValidate="txtTCEmail" resourcekey="rfvTCTxtEmail"
				CssClass="error">
            </asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator runat="server" ID="revTCTxtEmail" ControlToValidate="txtTCEmail" resourcekey="revTCTxtEmail"
               CssClass="error" ValidationExpression="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$">
            </asp:RegularExpressionValidator>
		</td>
	</tr>
	<tr>
		<td>Địa chỉ</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtTCDiaChi"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTCTxtDiaChi" ControlToValidate="txtTCDiaChi" resourcekey="rfvTCTxtDiaChi"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
    <asp:Panel runat="server" ID="pnlToChuc" Visible="true">
    <tr>
		<td><asp:Label runat="server" ID="lblSoQuyetDinh"></asp:Label></td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtTCSoQuyetDinhThanhLap"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTCTxtSoQuyetDinhThanhLap" ControlToValidate="txtTCSoQuyetDinhThanhLap" resourcekey="rfvTCTxtSoQuyetDinhThanhLap"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
	<tr>
		<td><asp:Label runat="server" ID="lblNgayCapQuyetDinh"></asp:Label></td>
		<td>
			<dnn:DnnDatePicker runat="server" cssclass="dnnforminput dnnFormRequired" id="txtTCNgayCapQuyetDinhThanhLap" style="width:100%" />
            <asp:RequiredFieldValidator runat="server" ID="rfvTCTxtNgayCapQuyetDinhThanhLap" ControlToValidate="txtTCNgayCapQuyetDinhThanhLap" resourcekey="rfvTCTxtNgayCapQuyetDinhThanhLap"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
    </asp:Panel>
    <tr>
		<td>Mã số thuế</td>
		<td>
            <asp:TextBox runat="server" ID="txtTCMaSoThue"></asp:TextBox> 
            <asp:RegularExpressionValidator runat="server" ID="revMaSoThue" ControlToValidate="txtTCMaSoThue" ValidationExpression="^([0-9]{10})(|)(-[0-9]{3}|)$" ErrorMessage="Mã số thuế không hợp lệ"
				CssClass="error">
            </asp:RegularExpressionValidator>
		</td>
	</tr>
	<tr>
		<td>Logo</td>
		<td>
            <asp:Image runat="server" ID="imgTCLoGo" Width="100"/>
			<asp:FileUpload runat="server" ID="fileTCLoGo" />
		</td>
	</tr>
    <tr>
		<td>Điện thoại</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtTCDienThoai"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTCTxtDienThoai" ControlToValidate="txtTCDienThoai" resourcekey="rfvTCTxtDienThoai"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
    <tr>
		<td>Website</td>
		<td>
            <asp:TextBox runat="server" ID="txtTCWebsite" CssClass="dnnFormNoRequired"></asp:TextBox>
		</td>
	</tr>
    </asp:Panel>
    <asp:Panel runat="server" ID="pnlChuTaiKhoan">
	<tr>
		<td colspan="2"><strong>Thông tin nhân sự quản lý tài khoản</strong></td>
	</tr>
	<tr>
		<td>Họ và tên</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtCTKTenGoi"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKTenGoi" ControlToValidate="txtCTKTenGoi" ErrorMessage="Tên gọi phải khác rỗng"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
	<tr>
		<td>Ảnh đại diện</td>
		<td>
            <asp:Image runat="server" ID="imgCTKHinhDaiDien" Width="100" />
			<asp:FileUpload runat="server" ID="fileCTKHinhDaiDien" />
		</td>
	</tr>
	<tr>
		<td>Giới tính</td>
		<td>
			<asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddlCTKGioiTinh">
			</asp:DropDownList>
		</td>
	</tr>
	<tr>
		<td>Ngày sinh</td>
		<td>
			<dnn:DnnDatePicker runat="server" cssclass="dnnforminput dnnFormRequired" id="txtCTKNgaySinh" style="width:100%" />
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKNgaySinh" ControlToValidate="txtCTKNgaySinh" resourcekey="rfvTxtCTKNgaySinh"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
	<tr>
		<td>Mã số cá nhân</td>
		<td>
            <asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddCTKlLoaiDinhDanh" style="width:20%;"></asp:DropDownList>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtCTKSoDinhDanh" style="width:20%;"></asp:TextBox>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtCTKNoiCap" style="width:20%;" />
            <dnn:DnnDatePicker runat="server" CssClass="dnnFormInput dnnFormRequired" id="txtCTKNgayCap" style="width:20%" />
            <dnn:DnnDatePicker runat="server" CssClass="dnnFormInput dnnFormNoRequired" id="txtCTKNgayHetHan" style="width:20%"/>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKSoDinhDanh" ControlToValidate="txtCTKSoDinhDanh" resourcekey="rfvTxtCTKSoDinhDanh"
				CssClass="error">
            </asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator runat="server" ID="revSoDinhDanh" ControlToValidate="txtCTKSoDinhDanh" ValidationExpression="^[0-9]{4,13}$" ErrorMessage="Mã định danh không hợp lệ"
				CssClass="error"> 
            </asp:RegularExpressionValidator>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKNoiCap" ControlToValidate="txtCTKNoiCap" resourcekey="rfvTxtCTKNoiCap"
				CssClass="error">
            </asp:RequiredFieldValidator>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKNgayCap" ControlToValidate="txtCTKNgayCap" resourcekey="rfvTxtCTKNgayCap"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
	<tr style="display:none;">
		<td>Quốc tịch</td>
		<td>
            <asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddlCTKQuocTich">
			</asp:DropDownList>
		</td>
	</tr>
	<tr style="display:none;">
		<td>Dân tộc</td>
		<td>
            <asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddlCTKDanToc">
			</asp:DropDownList>
		</td>
	</tr>
	<tr style="display:none;">
		<td>Tôn giáo</td>
		<td>
            <asp:DropDownList CssClass="dnnFormRequired" runat="server" ID="ddlCTKTonGiao">
			</asp:DropDownList>
		</td>
	</tr>
	<tr style="display:none;">
		<td>Nguyên quán</td>
		<td>
            <asp:TextBox runat="server" ID="txtCTKNguyenQuanDiaChi" style="width:19%;" CssClass="dnnFormNoRequired"></asp:TextBox>
            <asp:DropDownList runat="server" ID="ddlCTKNguyenQuanTinh" AutoPostBack="true" OnSelectedIndexChanged="ddlCTKNguyenQuanTinh_SelectedIndexChanged" style="width:27%;" CssClass="dnnFormNoRequired"></asp:DropDownList>
            <asp:UpdatePanel runat="server" ID="UpdatePanel3" class="update_panel">
                <ContentTemplate>
                    <asp:DropDownList runat="server" ID="ddlCTKNguyenQuanHuyen" AutoPostBack="true" OnSelectedIndexChanged="ddlCTKNguyenQuanHuyen_SelectedIndexChanged" style="width:27%;" CssClass="dnnFormNoRequired"></asp:DropDownList>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="ddlCTKNguyenQuanTinh" EventName="SelectedIndexChanged" />
                </Triggers>
            </asp:UpdatePanel>
            <asp:UpdatePanel runat="server" ID="UpdatePanel5" class="update_panel">
                <ContentTemplate>
                    <asp:DropDownList runat="server" ID="ddlCTKNguyenQuanXa" style="width:27%;" CssClass="dnnFormNoRequired"></asp:DropDownList>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="ddlCTKNguyenQuanHuyen" EventName="SelectedIndexChanged" />
                </Triggers>
            </asp:UpdatePanel>
		</td>
	</tr>
	<tr>
		<td>Thường trú</td>
		<td>
            <asp:TextBox runat="server" ID="txtCTKThuongTruDiaChi" CssClass="dnnFormRequired" style="width:19%;"></asp:TextBox>
            <asp:DropDownList runat="server" ID="ddlCTKThuongTruTinh" CssClass="dnnFormRequired" AutoPostBack="true" OnSelectedIndexChanged="ddlCTKThuongTruTinh_SelectedIndexChanged" style="width:27%;"></asp:DropDownList>
            <asp:UpdatePanel runat="server" ID="UpdatePanel4" class="update_panel">
                <ContentTemplate>
                    <asp:DropDownList runat="server" ID="ddlCTKThuongTruHuyen" CssClass="dnnFormRequired" AutoPostBack="true" OnSelectedIndexChanged="ddlCTKThuongTruHuyen_SelectedIndexChanged" style="width:27%;"></asp:DropDownList>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="ddlCTKThuongTruTinh" EventName="SelectedIndexChanged" />
                </Triggers>
            </asp:UpdatePanel>
            <asp:UpdatePanel runat="server" ID="UpdatePanel6" class="update_panel">
                <ContentTemplate>
                    <asp:DropDownList runat="server" ID="ddlCTKThuongTruXa" CssClass="dnnFormRequired" style="width:27%;"></asp:DropDownList>
                    <asp:RequiredFieldValidator runat="server" ID="rfvDdlThuongTruXa" ControlToValidate="ddlCTKThuongTruXa" resourcekey="rfvDdlThuongTruXa"
				CssClass="error_block" ErrorMessage="Xã không được để trống"></asp:RequiredFieldValidator>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="ddlCTKThuongTruHuyen" EventName="SelectedIndexChanged" />
                </Triggers>
            </asp:UpdatePanel>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKThuongTruDiaChi" ControlToValidate="txtCTKThuongTruDiaChi" resourcekey="rfvTxtCTKThuongTruDiaChi"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
	<tr>
		<td>Địa chỉ hiện nay</td>
		<td>
            <asp:TextBox runat="server" ID="txtCTKHienNayDiaChi" style="width:19%;" CssClass="dnnFormNoRequired"></asp:TextBox>
            <asp:DropDownList runat="server" ID="ddlCTKHienNayTinh" AutoPostBack="true" OnSelectedIndexChanged="ddlCTKHienNayTinh_SelectedIndexChanged" style="width:27%;" CssClass="dnnFormNoRequired"></asp:DropDownList>
            <asp:UpdatePanel runat="server" ID="UpdatePanel1" class="update_panel">
                <ContentTemplate>
                    <asp:DropDownList runat="server" ID="ddlCTKHienNayHuyen" AutoPostBack="true" OnSelectedIndexChanged="ddlCTKHienNayHuyen_SelectedIndexChanged" style="width:27%;" CssClass="dnnFormNoRequired">
                    </asp:DropDownList>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="ddlCTKHienNayTinh" EventName="SelectedIndexChanged" />
                </Triggers>
            </asp:UpdatePanel>
            <asp:UpdatePanel runat="server" ID="UpdatePanel2" class="update_panel">
                <ContentTemplate>
                    <asp:DropDownList runat="server" ID="ddlCTKHienNayXa" style="width:27%;" CssClass="dnnFormNoRequired"></asp:DropDownList>
                </ContentTemplate>
                <Triggers>
                    <asp:AsyncPostBackTrigger ControlID="ddlCTKHienNayHuyen" EventName="SelectedIndexChanged" />
                </Triggers>
            </asp:UpdatePanel>
		</td>
	</tr>
	<tr>
		<td>Email</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtCTKEmail"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvCTKTxtEmail" ControlToValidate="txtCTKEmail" resourcekey="rfvCTKTxtEmail"
				CssClass="error">
            </asp:RequiredFieldValidator>
            <asp:RegularExpressionValidator runat="server" ID="revTxtCTKEmail" ControlToValidate="txtCTKEmail" resourcekey="revTxtCTKEmail"
               CssClass="error" ValidationExpression="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$">
            </asp:RegularExpressionValidator>
		</td>
	</tr>
	<tr>
		<td>Điện thoại</td>
		<td>
            <asp:TextBox CssClass="dnnFormRequired" runat="server" ID="txtCTKDienThoai"></asp:TextBox>
            <asp:RequiredFieldValidator runat="server" ID="rfvTxtCTKDienThoai" ControlToValidate="txtCTKDienThoai" resourcekey="rfvTxtCTKDienThoai"
				CssClass="error">
            </asp:RequiredFieldValidator>
		</td>
	</tr>
    </asp:Panel>
    <tr runat="server" id="rowTrangThai">
		<td>Trạng thái</td>
		<td>
            <asp:DropDownList runat="server" ID="ddlTrangThai" CssClass="dnnFormNoRequired"></asp:DropDownList> 
		</td>
	</tr>
	<tr>
		<td></td>
		<td>
			<asp:Button runat="server" Text="Lưu lại" ID="btnSave" CssClass="dnnPrimaryAction" OnClick="btnSave_Click"/>
            <a href="<%=GetPageLink(new string[]{""})%>" class="dnnSecondaryAction">Trở về</a>
		</td>
	</tr>
</table>
</div>
<script type="text/javascript">
    (function ($, Sys) {
        $(document).ready(function () {
            $("#<%=ddlOwnerCode.ClientID%>").select2();
        });
    }(jQuery, window.Sys));

    $(function () {
        $(".captcha input").attr("placeholder", '<%=LocalizeString("lblNhapMaXacThuc")%>');
        $("#<%=txtCTKSoDinhDanh.ClientID%>").attr("placeholder", '<%=LocalizeString("lblSoDinhDanh")%>');
        $("#<%=txtCTKNoiCap.ClientID%>").attr("placeholder", '<%=LocalizeString("lblNoiCap")%>');
        $("input[id*='txtCTKNgayCap']").attr("placeholder", '<%=LocalizeString("lblNgayCap")%>');
        $("input[id*='txtCTKNgayHetHan']").attr("placeholder", '<%=LocalizeString("lblNgayHetHan")%>');

        // Thêm * cho các row chứa input validate
        $(".dnnFormRequired").parent().parent().each(function (index, item) {
            var currentHmtl = $(item).find("td").first().html();
            var newHtml = currentHmtl + " <span class='required_field'>(*)</span>";
            $(item).find("td").first().html(newHtml)
        });
    });
</script>