import { Heading } from './layaout/Heading'
import { BaseLayout } from './layaout/BaseLayout'
import { Navigate, Route, Routes } from 'react-router-dom'
import RouteAuth from './features/auth/routes/RouteAuth'
import { useSelector } from 'react-redux'
import { RouteUser } from './features/user/routes/RouteUser'
import { RouteProduct } from './features/product/routes/RouteProduct'
import { RouteTransaction } from './features/transaction/routes/RouteTransaction'
import { NotFound } from './layaout/NotFound'


export const App = () => {

  const { verifyToken, user } = useSelector(state => state.auth_state)

  return (
    <>
      <BaseLayout>
        <Routes>
          {
            verifyToken
            ?
            <>
            <Route path='/' element={<Heading/>} />
            <Route path='/*' element={<Navigate to={'/product/product_search'}/>} />
            {/* <Route path='/*' element={<NotFound/>}/> */}
              {
                user.is_superuser
                ?
                <>
                <Route path='user/*' element={<RouteUser/>}/>
                <Route path='product/*' element={<RouteProduct/>}/>
                </>
                :
                <>
                <Route path='transaction/*' element={<RouteTransaction/>}/>
                </>
              }
            </>
            :
            <>
            <Route path='/' element={<Heading/>} />
            <Route path='auth/*' element={<RouteAuth/>} />
            {/* <Route path='/*' element={<Navigate to={'/'}/>} /> */}
            <Route path='/*' element={<NotFound/>}/>
            </>
          }
          
        </Routes>
      </BaseLayout>
    </>
  )
}

