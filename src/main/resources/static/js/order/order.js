$(function() {

    /* 위 주문자 정보와 동일하게 입력 체크박스 선택시 작동 */
    $('input[name=enterSame]').on('click', function() {
        if($(this).is(':checked')) {
            $('input[name=receiveName]').val($('input[name=orderName]').val());
            $("#receive-phone-start").val($("#order-phone-start").val()).prop("selected", true);
            $('input[name=receivePhoneMiddle]').val($('input[name=orderPhoneMiddle]').val());
            $('input[name=receivePhoneEnd]').val($('input[name=orderPhoneEnd]').val());
            $(this).prop('checked', true);
        } else {
            $('input[name=receiveName]').val('');
            $("#receive-phone-start option:eq(0)").prop("selected", true);
            $('input[name=receivePhoneMiddle]').val('');
            $('input[name=receivePhoneEnd]').val('');
            $(this).prop('checked', false);
        }
    });

    /* 계좌번호 입금 후 주문하기 버튼 눌러주세요 체크박스 눌렀을 때 주문하기 버튼 활성화/비활성화 */
    $('.pay-check').on('click', function() {
        if($(this).is(':checked')) {
            $('#order-btn').prop('disabled', false);
        } else {
            $('#order-btn').prop('disabled', true);
        }
    });

    /* 우편번호 찾기 */
    $('#find-address').on('click', function() {
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var roadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 참고 항목 변수

                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                   extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraRoadAddr !== ''){
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("roadAddress").value = roadAddr + extraRoadAddr;
            }
        }).open();
    });

    /* 주문하기 버튼 눌렀을 때 정상적으로 정보가 들어있는지 검사 후 submit */
    $('#order-btn').on('click', () => {
        if(!$('input[name=orderName]').val()) {
            alert('주문자 정보 이름을 입력하세요');
            $('input[name=orderName]').focus();
            return;
        }

        if(!$('input[name=orderPhoneMiddle]').val()) {
            alert('주문자 정보 휴대폰 번호를 입력하세요');
            $('input[name=orderPhoneMiddle]').focus();
            return;
        }

        if(!$('input[name=orderPhoneEnd]').val()) {
            alert('주문자 정보 휴대폰 번호를 입력하세요');
            $('input[name=orderPhoneEnd]').focus();
            return;
        }

        if(!$('input[name=receiveName]').val()) {
            alert('배송지 정보 이름을 입력하세요');
            $('input[name=receiveName]').focus();
            return;
        }

        if(!$('input[name=receivePhoneMiddle]').val()) {
            alert('배송지 정보 휴대폰 번호를 입력하세요');
            $('input[name=receivePhoneMiddle]').focus();
            return;
        }

        if(!$('input[name=receivePhoneEnd]').val()) {
            alert('배송지 정보 휴대폰 번호를 입력하세요');
            $('input[name=receivePhoneEnd]').focus();
            return;
        }

        if(!$('#roadAddress').val() || !$('#postcode').val() || !$('.detail-address').val()) {
            alert('배송지 정보 주소를 입력하세요');
            $('.detail-address').focus();
            return;
        }

        document.orderForm.submit();
    });

});