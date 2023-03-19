//link http://api.wisey.app/api/v1/core/preview-courses
let token = '';

// Get authorization token
async function getToken() {
  let tokenBody;
  const response = await fetch('http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions');
  if (response.status >= 200 && response.status <= 299) {
    tokenBody = await response.json();
  } else {
    // Handle errors
    throw new Error(response.status, response.statusText);
  }
  token = tokenBody.token;
}

// get all courses at once
async function getCourses() {
  // get new token before each request
  await getToken();
  // make a request with an attached token
  const response = await fetch('http://api.wisey.app/api/v1/core/preview-courses', {
    headers: { Authorization: 'Bearer ' + token }
  });

  //handle response on success statuses or send an error
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  } else {
    // Handle errors
    throw new Error(response.status, response.statusText);
  }
}

// get one course info
async function getCourse(courseId) {
  // get new token before each request
  await getToken();
  // make a request with an attached token
  const response = await fetch('http://api.wisey.app/api/v1/core/preview-courses/' + courseId, {
    headers: { Authorization: 'Bearer ' + token }
  });

  //handle response on success statuses or send an error
  if (response.status >= 200 && response.status <= 299) {
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    return jsonResponse;
  } else {
    // Handle errors
    throw new Error(response.status, response.statusText);
  }
}

export { getCourses, getCourse };
