import nodemailer from 'nodemailer';
import AcademicInfo from '../models/academicinfo.model';
import User from '../models/user.model';
import Student from '../models/student.model';

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secureConnection: true,
    port: 465,
    auth: {
       user: process.env.SENDER_EMAIL,
       pass: process.env.EMAIL_PASSWORD
    }
  });

export async function getUser(req, res) {
    try{
        const request = await User.forge().where({id: req}).fetch();
        return request.toJSON();
    }catch(e){
        console.log(e)
    };
}

// This function needs improvement.
export async function getAcademicDetailsByStudent(req){
    var data = await User.forge().where({id: req}).fetch();
    data = data.toJSON()

    var student_detail = await Student.where({student_id: req}).fetch();
    student_detail = student_detail.toJSON()
    data["BID"] = student_detail.BID

    var academicDetail = await AcademicInfo.where({student_id: req}).fetchAll();
    var details = academicDetail.toJSON()

    // I tried to loop through details object 
    // and pushed new key/value pair for advisor/dean name. It worked but
    // the task did wait the getUser function to complete. and  data["academicDetail"] = details was
    // called  before the User detail was fetched from getUser function
    var advisor_name_old = await getUser(details[0].advisor_id)
    var dean_name_old = await getUser(details[0].dean_id)
    var advisor_name_new = await getUser(details[1].advisor_id)
    var dean_name_new = await getUser(details[1].dean_id)

    details[0]["advisor_name"] = advisor_name_old.first_name + " " + advisor_name_old.last_name
    details[0]["dean_name"] = dean_name_old.first_name + " " + dean_name_old.last_name
    details[1]["advisor_name"] = advisor_name_new.first_name + " " + advisor_name_new.last_name
    details[1]["dean_name"] = dean_name_new.first_name + " " + dean_name_new.last_name

    data["academicDetail"] = details
    return data;
}

export async function getUserByEmail(req) {
    try{
        await User.where({email: req}).fetch()
    }catch(e){
        console.log(e)
    };
}

export async function getAcademicDetails(req) {
    try{
        await AcademicInfo.where({student_id: req}).fetch()
    }catch(e){
        console.log(e)
    };
}

export async function saveAcademicInfo(req,res){
    var res = {status: 'status' }
    await AcademicInfo.forge({
        school_name:req.school_name,
        degree : req.degree,
        major : req.major,
        minor : req.minor,
        advisor_id : req.advisor_id,
        dean_id : req.dean_id,
        student_id: req.student_id,
        old_new_flag : req.old_new_flag
            }).save().then()
                .then(user => {
                    console.error("success"); 
                    }
                ).catch((e) => {
                    console.error(e); 
                });
    
    var user_ids = {
        student_id : req.student_id,
        advisor_id: req.advisor_id
    }
    //send email to advisor
    await sendEmail(user_ids)
}
        


export async function sendEmail(req,res){
    const student_data = await getUser(req.student_id);
    const advsisor_dean_data = await getUser(req.advisor_id)
    let academicDetailUrl = process.env.DOMAIN + '/academicDetails/'+student_data.id

    console.log(academicDetailUrl)

    let mailOptionsDean = {
        from: 'defensivecoding@okcu.com',
        to: advsisor_dean_data.email,
        subject: 'Academic Change Form of '+ student_data.first_name + ' '+student_data.last_name,
        html: '<h2>Student Academic Change Request</h2>'+
        '<p>'+ student_data.first_name +' '+student_data.last_name + ' has requested for Academic Change</p>'+
        '<a target = "_blank" href="'+ academicDetailUrl +'">Click here to View Details</a>'
      };

    transporter.sendMail(mailOptionsDean, function(err, data) {
          console.log("Email sent successfully");
      });
}
        