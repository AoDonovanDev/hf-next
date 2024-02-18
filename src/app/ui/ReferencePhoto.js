import Image from "next/image"
import { upload } from "@/lib/actions";

export default function ReferencePhoto({dispatch, warnings, existingInfo}){

  async function next(formData){
    console.log(formData.get('referencePhoto'));
    const fileInfo = formData.get('referencePhoto');
    if(!fileInfo.size){
      return dispatch({ type: 'next', payload: {imgUrl: ''} })
    }
    const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
      });
    };
    const base64 = await convertBase64(fileInfo);

    const imgUrl = await upload(base64)


    dispatch({type: 'next', payload:{imgUrl}});
  }

  function prev(){
    dispatch({type: 'prev'})
  }



  return(
    <form className="overflow-auto overscroll-contain" action={next}>
      <div className="flex flex-col">
        <Image src="/croppedPhotoPickerCake.jpg" alt="cake reference photo" height={200} width={200} className="w-full"/>
        <div>
          <h2 className="card-title">Add a reference photo</h2>
          <p>Add a photo of a Housefly cake that you&apos;ve liked or other photo for color reference. No cake will be perfectly replicated. Cakes by other local bakers are not allowed as reference. If you like their work, you should support and order from them!</p>
        </div>
      </div>
      <div className="card-actions justify-center">
        <input type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="referencePhoto" accept="image/*" />
      </div>  
      <div className="flex justify-between">
        <button type="button" className="btn btn-warn" onClick={prev}>Previous</button>
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  )
}