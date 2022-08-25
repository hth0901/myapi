<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="GuiPAKN.ascx.cs" Inherits="HueCIT.Modules.HoiDap.GuiPAKN" %>
<%@ Register TagPrefix="dnn" Assembly="DotNetNuke" Namespace="DotNetNuke.UI.WebControls"%>
<%@ Register TagPrefix="dnn" Assembly="DotNetNuke.Web" Namespace="DotNetNuke.Web.UI.WebControls" %>
<%@ Register Src="~/desktopmodules/HoiDap/Pager.ascx" TagPrefix="dnn" TagName="Pager" %>
<style type="text/css">
    .update_panel {display:inline;}
    /*a.dnnDisabledAction:link, a.dnnDisabledAction:visited, a.dnnDisabledAction:active, a.dnnDisabledAction:hover */
    .dnnDisabledAction{
        text-decoration: none;color: Silver;opacity: 0.2;/*IE8*/ -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
    }
	td {white-space:nowrap;}
    .error {color:red;display:block;}
    span[style*="hidden;"] {display:none;}

    input[type="text"], textarea{width: 100%}
    .frm_send_question {width:100%;}
    .frm_send_question_left {float:left;width:30%;padding:0 5px;}
    .frm_send_question_right {float:left;width:70%;padding:0 5px;}
    .icoAnswer {background: url("/DesktopModules/HoiDap/images/iconTraloi.gif") no-repeat scroll left top transparent;height: 16px;padding-left: 18px;/*width: 50px;*/color: #1D83B4;font-weight: bold;cursor:pointer;}
    .icoQues {background: url("/DesktopModules/HoiDap/images/iconHoi.gif") no-repeat scroll left top transparent;height: 16px;padding-left: 18px;text-align: justify;width: 16px;}
    .question_block {display:block;margin-bottom:10px;padding-bottom:10px;border-bottom:solid 1px #ccc;}
    .question_title {font-weight:bold;color:#000;font-size: 17px}
    .question_content {margin-bottom: 5px;/*font-style:italic;*/}
    .request_by, .reply_by {color:#333;}
    .answer_content {margin-top:5px;font-size: 14px;}

    .captcha input {width:150px;margin-left:10px;padding-top:5px;padding-bottom:5px;}
    .captcha div {display:none;}
    .captcha{margin-bottom:5px;}
    .captcha_error{display:none;}
    .hide {
    display: none !important;
}
blockquote, blockquote p {
    font-size: 14px;
    line-height: 1.4;
    color: #000;
    font-style: italic;
}
div.from-bg {
    background-color: #ebf9fb;
    border: 1px solid #c7e0e5;
}
</style>
<div runat="server" id="moduleMessage"></div>
<div class="frm_send_question register-form">
    <div class="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="title-bottom">                
                    <i class="far fa-share-square mr-2"></i>Gửi phản ánh kiến nghị
              </h5>
            </div>

            <div class="from-bg">
              <div class="card-body">
                <div class="frm_send_question_content">
            <p class="lead">
                Kiến nghị của bạn sẽ được biên tập và gửi đến cơ quan có thẩm quyền để giải quyết. Xin vui lòng gõ tiếng Việt có dấu.
                <!--Vui lòng nhập đầy đủ họ tên trước khi nhập thông tin liên hệ-->
            </p>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Họ tên</label>
                <div class="col-sm-9">
                    <asp:TextBox ID="txtHoTen" runat="server" CssClass="dnnFormRequired form-control" MaxLength="250"></asp:TextBox>
                    <asp:RequiredFieldValidator runat="server" ID="rfvTxtHoTen" ControlToValidate="txtHoTen"
                                CssClass="error" ValidationGroup="ValHD">
                    </asp:RequiredFieldValidator>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Địa chỉ</label>
                <div class="col-sm-9">
                    <asp:TextBox ID="txtDiaChi" runat="server" CssClass="dnnFormRequired form-control" MaxLength="250"></asp:TextBox>
                    <asp:RequiredFieldValidator runat="server" ID="rfvTxtDiaChi" ControlToValidate="txtDiaChi"
                                CssClass="error" ValidationGroup="ValHD">
                    </asp:RequiredFieldValidator>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Điện thoại</label>
                <div class="col-sm-9">
                    <asp:TextBox ID="txtDienThoai" runat="server" CssClass="dnnFormRequired form-control" MaxLength="20"></asp:TextBox>
                    <asp:RequiredFieldValidator runat="server" ID="rfvTxtDienThoai" ControlToValidate="txtDienThoai"
                                CssClass="error" ValidationGroup="ValHD">
                    </asp:RequiredFieldValidator>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Email</label>
                <div class="col-sm-9">
                    <asp:TextBox ID="txtEmail" runat="server" CssClass="dnnFormRequired form-control" MaxLength="100"></asp:TextBox>
                    <asp:RequiredFieldValidator runat="server" ID="rfvTxtEmail" ControlToValidate="txtEmail"
                                CssClass="error" ValidationGroup="ValHD">
                    </asp:RequiredFieldValidator>
                    <asp:RegularExpressionValidator runat="server" ID="revTxtEmail" ControlToValidate="txtEmail"
                        CssClass="error" ValidationExpression="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$" ValidationGroup="ValHD">
                    </asp:RegularExpressionValidator>
                </div>
            </div>
            <%--<div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Tiêu đề câu hỏi</label>
                <div class="col-sm-9">
                    <asp:TextBox ID="txtTieuDeCauHoi" runat="server" CssClass="dnnFormRequired form-control" MaxLength="250"></asp:TextBox>
                    <asp:RequiredFieldValidator runat="server" ID="rfvTxtTieuDeCauHoi" ControlToValidate="txtTieuDeCauHoi"
                                CssClass="error" ValidationGroup="ValHD">
                    </asp:RequiredFieldValidator>
                </div>
            </div>--%>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Nội dung câu hỏi</label>
                <div class="col-sm-9">
                    <asp:TextBox TextMode="MultiLine" Rows="5" ID="txtNoiDungCauHoi" runat="server" CssClass="dnnFormRequired"></asp:TextBox>
                    <asp:RequiredFieldValidator runat="server" ID="rfvTxtNoiDungCauHoi" ControlToValidate="txtNoiDungCauHoi"
                                CssClass="error" ValidationGroup="ValHD">
                    </asp:RequiredFieldValidator>
                </div>
            </div>
            <div class="form-group row">
                <asp:Label class="col-sm-3 col-form-label text-right" runat="server" ID="lblCongKhaiEmail" resourcekey="lblCongKhaiEmail"></asp:Label>
                <div class="col-sm-9">
                    <asp:RadioButtonList runat="server" ID="rblCongKhaiEmail" RepeatDirection="Horizontal">
                        <asp:ListItem Value="true" Text="Có" Selected="true"> </asp:ListItem>
                        <asp:ListItem Value="false" Text="Không"> </asp:ListItem>
                    </asp:RadioButtonList>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right">Nhập mã xác thực</label>
                <div class="col-sm-9">
                    <dnn:CaptchaControl CaptchaChars="1234567890" CaptchaLength="4" runat="server" ID="ctlCaptcha" CaptchaHeight="40" CaptchaWidth="150" ErrorStyle-CssClass="captcha_error" cssclass="captcha"/>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-3 col-form-label text-right"></label>
                <div class="col-sm-9">
                    <asp:Button ID="btnSave" runat="server" CssClass="btn btn-primary" OnClick="btnSave_Click"  ValidationGroup="ValHD"/>
                </div>
        </div>
              </div>
              </div>
            </div>
          </div>

        <div id="panelLoading" style="position:absolute; top:50%; left:50%; width:100%; height:100%" class="d-none">
            <asp:Image ID="imgLoading" runat="server" ImageUrl="~/images/loading.gif" AlternateText="Chuyển thông tin vướng mắc đến bộ phận giải quyết!" />
        </div>
    </div>
</div>
<script type="text/javascript">
    //$(function () {

    //});
    /*globals jQuery, window, Sys */
    (function ($, Sys) {
        function setSendQuestion() {
            var btnSendQuestion = $("#<%=btnSave.ClientID%>");
            btnSendQuestion.click(function () {
                if (Page_IsValid) {
                    $("#panelLoading").removeClass("hide").addClass("show");

                    if ($(this).hasClass("dnnDisabledAction")) {
                        //console.log('aa1');
                        return false;
                    }
                    //console.log('aa2');
                    btnSendQuestion.addClass("dnnDisabledAction");
                }
            });
        }

        $(document).ready(function () {
            $(".question_title").click(function () {
                $(this).parent().find(".answer_content").toggleClass("hide");
            });
            $(".captcha input").attr("placeholder", '<%=LocalizeString("lblNhapMaXacThuc")%>');

            //$('[data-toggle="tooltip"]').tooltip();
            //$('.btn').tooltip({ html: true, placement: "auto" });//{ title: "Hooray" }
            //$("a").tooltip();
            //showHSDT();
            //customFileInput();
            setSendQuestion();

            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () {
                setSendQuestion();
            });
        });
    }(jQuery, window.Sys));
</script>