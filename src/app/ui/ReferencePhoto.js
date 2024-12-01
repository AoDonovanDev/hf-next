import Image from "next/image"
import { upload } from "@/lib/actions";
import { useFormStatus } from 'react-dom';

export default function ReferencePhoto({dispatch, warnings, existingInfo}){

  async function next(formData){
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

  function NextButton(){
    const { pending } = useFormStatus();
    return <button type="submit" className="formBtn btn-primary mr-[16px] md:self-end" disabled={pending}>{pending ? <span className="loading loading-spinner text-primary"></span> : 'Next'}</button>;
  }

  return(
    <form className="overflow-auto overscroll-contain h-full flex flex-col gap-[32px] pb-6" action={next}>
      <div className="flex flex-col">
        <Image src="/croppedPhotoPickerCake.jpg" alt="cake reference photo" height={800} width={800} className="w-full self-center rounded md:h-[440px] md:w-[440px]"/>
        <div className="flex flex-col gap-[12px] pt-6">
          <h2 className="card-title cursiveHeader mb-[8px]">Add a reference photo</h2>
          <p >Add a photo of a Housefly cake that you&apos;ve liked or other photo for color reference. No cake will be perfectly replicated. Cakes by other local bakers are not allowed as reference. If you like their work, you should support and order from them!</p>
        </div>
      </div>
      <div className="card-actions justify-center">
        <input type="file" className="file-input file-input-bordered file-input-secondary w-full max-w-xs" name="referencePhoto" accept="image/*" />
      </div>  
      <div className="flex justify-between md:h-full">
        <button type="button" className="formBtn btn-warn md:self-end" onClick={prev}>Previous</button>
        <NextButton/>
        {/* <button type="submit" className="formBtn btn-primary mr-[16px] md:self-end">Next</button> */}
      </div>
    </form>
  )
}