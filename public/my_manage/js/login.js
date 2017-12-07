$(function(){
    // $('button[type=submit]').click(function(e){
    //     e.preventDefault();
    //     console.log('ha')
    // })
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 10,
                        message: '用户名长度必须在3到10之间'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码长度必须在6到30之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        console.log('hahah')

        NProgress.start();
        $.ajax({
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            type:'post',
            success:function(backData){
                console.log(backData);
                setTimeout(function(){
                    NProgress.done();
                },2000)
                if(backData.success){
                    window.location='./index.html';
                }else {
                    var validator = $("form").data('bootstrapValidator');  //获取表单校验实例
                    if(backData.error==1000){
                        //使用表单校验实例可以调用一些常用的方法。
                        validator.updateStatus('username', 'INVALID', 'callback');
                    }else if(backData.error==1001){
                        validator.updateStatus('password', 'INVALID','callback')
                    }
                }
            }
        })
    });
})