import {MediaList} from './MediaList'
import * as React from 'react'
import {inject, observer} from 'mobx-react'
import {IAppState} from '../app-state'
import {DragNDropUpload} from './DragNDropUpload'
import {ContextualActions} from './ContextualActions'
import {Zoom} from './Zoom'
import {IsLoading} from './IsLoading'
import {LogoutBtn} from './LogoutBtn'
import {LoginForm} from './LoginForm'

require('./Navigation.less')
require('./Layout.less')

@inject('appState')
@observer
export class Layout extends React.Component<{} & IAppState, {}> {
    constructor(props) {
        super(props)
    }

    private notifyAboutRender() {
        this.props.appState.incLayoutRerenderCount()
    }

    componentDidUpdate(): void {
        this.notifyAboutRender()
    }

    componentDidMount(): void {
        this.notifyAboutRender()
    }

    render() {
        const {appState} = this.props
        const [_, collectionUrl] = appState.router.pathSegments
        return (
            <div className='layout'>
                <div className='layout__navigation'>
                    <div className='navigation'>
                        <div className='navigation__items'>
                            {appState.isAuthenticated ? <LogoutBtn /> : <LoginForm />}
                        </div>
                    </div>
                </div>
                <IsLoading />
                {appState.isAuthenticated ? (
                    <>
                        <div className='layout__content'>
                            <div
                                className='layout__side'
                                style={{
                                    width: appState.sideWidth + 'px'
                                }}
                            >
                                <ContextualActions />
                            </div>
                            <div
                                className='layout__main'
                                style={{
                                    marginLeft: appState.sideWidth + 'px'
                                }}
                            >
                                <MediaList />
                            </div>
                        </div>
                        <DragNDropUpload />
                        {<Zoom />}
                    </>
                ) : collectionUrl ? (
                    <div>
                        {appState.currentlyViewedCollectionId}
                        {appState.currentlyViewedCollection}
                        <MediaList />
                        {<Zoom />}
                    </div>
                ) : null}
            </div>
        )
    }
}
