import Button from "@/components/Button";
import Input from "@/components/Input";
import { useDocumentTitle } from "@/hooks"

const Login = () => {
    useDocumentTitle('Login | Nekolingo');
    return (
        <>
            <Input placeholder="Email" className="w-60 mb-2" size="large"/>
            <Button title="Next" className="w-60" size="medium"/>
        </>
    )
}

export default Login