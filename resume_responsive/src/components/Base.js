require("regenerator-runtime/runtime");

export const csrftoken = Cookies.get('csrftoken');

export function validate(value) {
    // only allow numberSubsection >= 1
    if (value) {
        return Math.max(parseInt(value), 1);
    } else {
        return 1;
    }
}

export async function list_resume() {
    // get list of resumem
    try {
        let response = await fetch('/list_resume/');
        response = await response.json();
        return response['content'];
    } catch {
        console.log('Error happened when trying to load list of resume');
    }
}

export function str2bool(value) {
    // convert 'true' and 'false' to its boolean value
    switch(true) {
        case value === true || value === 'true':
            return true;
        default:
            return false;
    }
}

export function removeRedundant(sessionData) {
    // only work with sessionData
    // remove the redundant subSection data before saving
    let listSubsection = ['school', 'company', 'certificate', 'project', 'skill'];
    let numberSubsection = ['numberSchool', 'numberCompany', 'numberCertificate', 'numberProject', 'numberSkill'];
    for (let i in numberSubsection) {
        let totalNumber = parseInt(sessionData.getItem(numberSubsection[i]));
        let keyWord = listSubsection[i];
        let re = new RegExp(`(?<=^${keyWord}\\w+[-])\\d+`);
        Object.entries(sessionData).forEach( function([key, value]) {
            let match = re.exec(key);
            if (match) {
                let order = parseInt(key.split("-")[1]);
                if (order > totalNumber - 1) {
                    console.log(order, totalNumber);
                    console.log(key);
                    sessionData.removeItem(key);
                }
            }
        })
    }
    return sessionData;
}