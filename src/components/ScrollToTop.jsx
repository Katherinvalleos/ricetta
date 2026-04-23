import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function getScrollElement() {
    return document.scrollingElement || document.documentElement || document.body
}

function resetScrollPosition() {
    const scrollElement = getScrollElement()

    scrollElement.scrollTop = 0
    scrollElement.scrollLeft = 0
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
}

function isModifiedClick(event) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
}

function shouldResetOnAnchorClick(event, anchor) {
    if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
        return false
    }

    if (anchor.target && anchor.target !== '_self') {
        return false
    }

    if (anchor.hasAttribute('download')) {
        return false
    }

    const href = anchor.getAttribute('href')

    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return false
    }

    const targetUrl = new URL(anchor.href, window.location.href)
    const currentUrl = new URL(window.location.href)

    if (targetUrl.origin !== currentUrl.origin) {
        return false
    }

    const isHashOnlyNavigation =
        targetUrl.pathname === currentUrl.pathname &&
        targetUrl.search === currentUrl.search &&
        targetUrl.hash &&
        targetUrl.hash !== currentUrl.hash

    if (isHashOnlyNavigation) {
        return false
    }

    return (
        targetUrl.pathname !== currentUrl.pathname ||
        targetUrl.search !== currentUrl.search ||
        targetUrl.hash !== currentUrl.hash
    )
}

function ScrollToTop() {
    const { pathname, search, hash, key } = useLocation()

    useEffect(() => {
        function handleDocumentClick(event) {
            if (!(event.target instanceof Element)) {
                return
            }

            const anchor = event.target.closest('a[href]')

            if (!(anchor instanceof HTMLAnchorElement)) {
                return
            }

            if (!shouldResetOnAnchorClick(event, anchor)) {
                return
            }

            resetScrollPosition()
        }

        function handlePopState() {
            resetScrollPosition()
        }

        document.addEventListener('click', handleDocumentClick, true)
        window.addEventListener('popstate', handlePopState)

        return () => {
            document.removeEventListener('click', handleDocumentClick, true)
            window.removeEventListener('popstate', handlePopState)
        }
    }, [])

    useLayoutEffect(() => {
        const html = document.documentElement
        const body = document.body
        const previousHtmlBehavior = html.style.scrollBehavior
        const previousBodyBehavior = body.style.scrollBehavior

        html.style.scrollBehavior = 'auto'
        body.style.scrollBehavior = 'auto'

        resetScrollPosition()

        const restoreBehavior = window.requestAnimationFrame(() => {
            html.style.scrollBehavior = previousHtmlBehavior
            body.style.scrollBehavior = previousBodyBehavior
        })

        return () => {
            window.cancelAnimationFrame(restoreBehavior)
            html.style.scrollBehavior = previousHtmlBehavior
            body.style.scrollBehavior = previousBodyBehavior
        }
    }, [pathname, search, hash, key])

    return null
}

export default ScrollToTop
