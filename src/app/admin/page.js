import { login } from "@/lib/actions";

export default function Page() {

  return (
    <div className="card w-96 bg-neutral text-neutral-content flex flex-col justify-center self-center p-8">
      <div className="card-body items-center text-center">
        <form action={login} className="flex gap-8">
          <input type="text" placeholder="Type here" className="input input-ghost w-full max-w-xs bg-secondary" name="pwd" />
          <button className="btn bg-primary w-1/4">X</button>
        </form>
      </div>
    </div>
  )
}