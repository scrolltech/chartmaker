import axiosInstance from './../config';

export async function fetchCharts(id = null, callback) {
  let url = '/chart';
  if (id) url += '/' + id;

  try {
    const response = await axiosInstance.get(url);
    if (response.status === 200) {
      console.log(response.data);
      callback(response.data);
      return;
    }
  } catch (error) {
    console.log('Error occured: ' + error);
    return;
  }
}

export async function saveAndPublishChart(id, data, callback) {
  const patchData = {
    mod_data: {
      title: 'General Elections 2019: Results',
      data
    }
  };

  try {
    const url = '/chart/' + id;
    const response = await axiosInstance.patch(url, JSON.stringify(patchData));
    if (response.status === 200) {
      console.log(response.data);
      callback(response.data);
      return;
    }
  } catch (error) {
    console.log('Error occured: ' + error);
    callback(false);
    return;
  }
}
