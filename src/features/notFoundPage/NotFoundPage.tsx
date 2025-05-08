import Button from "../../components/button/Button";

function NotFoundPage() {

    const handleGoHome = () => {
        alert('jhsvdfg')
    }

    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div className="text-primary text-9xl">404</div>
        <div className="">Oops! Looks like you took a wrong turn on the dance floor.</div>
        <div className="mt-3">
            <Button
                text="Back to the Dance!"
                onClick={() => handleGoHome()}
                loading={false}
                className=""
                type="button"
            />
        </div>
      </div>
    )
  }
  
  export default NotFoundPage;
  