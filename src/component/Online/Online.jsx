import useOnline from "../../Hooks/useOnline";


export default function Online({children}) {
  let isOnline=useOnline()
  if(isOnline){
    return children
  }

}
