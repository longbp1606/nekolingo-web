import { LoadingWrapper } from './Loading.styled'

const Loading = () => {
    return (
        <>
            <LoadingWrapper>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{
                        width:'48px',
                        height:'48px',
                        border:'6px solid #eee',
                        borderTop:'6px solid #ffb347',
                        borderRadius:'50%',
                        animation:'spin 1s linear infinite',
                        marginBottom:'16px'
                    }} />
                    <span style={{fontSize:'1.2rem',color:'#888'}}>Loading...</span>
                </div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </LoadingWrapper>
        </>
    )
}

export default Loading