import
{
    getRand, getRandInt, getRandRange, getRandIntRange, getBalancedRandRange,
    getElement, getAllElements, sleep, getClamp,
    getZeroRelDelay, getRelDelay,
    invoke, invokeRepeating
} from './Misc/helperMethods.js';

class StatusCodeCard
{
    selector = "";
    element;
    frontCard;
    backCard;
    cardInfo;
    isFlipped;          // Used for mobile devices only.

    // Status Code Card constructor
    constructor(_selector)
    {
        this.selector = _selector;
        this.element = getElement(_selector);
        this.frontCard = getElement(`${_selector} .Card-Front`);
        this.backCard = getElement(`${_selector} .Card-Back`);
        this.isFlipped = false;

        let $self = this;
        this.element.addEventListener("mouseenter", function() {$self.flipToBack();});
        this.element.addEventListener("mouseleave", function() {$self.flipToFront();});
        this.element.addEventListener("touchstart", function() {$self.flip();});
    }

    flip()
    {
        // If card is already flipped, flip to the front side. Otherwise, flip to the back side.
        if (this.isFlipped)
        {
            this.flipToFront();
        }
        else
        {
            this.flipToBack();
        }
    }
    
    flipToBack()
    {
        const flipCardTL = gsap.timeline();
        flipCardTL
            .to(this.frontCard, {duration: 0.5, rotationY: 180, ease: 'power1.inOut'}, getZeroRelDelay())
            .to(this.backCard, {duration: 0.5, rotationY: 360, ease: 'power1.inOut'}, getZeroRelDelay());

        this.isFlipped = true;
    }
    
    flipToFront()
    {
        const flipCardTL = gsap.timeline();
        flipCardTL
            .to(this.frontCard, {duration: 0.5, rotationY: 0, ease: 'power1.inOut'}, getZeroRelDelay())
            .to(this.backCard, {duration: 0.5, rotationY: 180, ease: 'power1.inOut'}, getZeroRelDelay());
            
        this.isFlipped = false;
    }
}

class StatusCodeGroup
{
    selector = "";
    element;
    cards;
    headerBox;
    boxContent;
    dropdownArrow;
    isExpanded;

    // Status Code Group constructor
    constructor(_selector, _cards, _statusID)
    {
        this.selector = _selector;
        this.element = getElement(_selector);
        this.cards = _cards;
        this.headerBox = getElement(`${_selector} .Header-Box`);
        this.boxContent = getElement(`${_selector} .Box-Content`);
        this.dropdownArrow = getElement(`${_selector} .Dropdown-Arrow-${_statusID}XX`);
        this.isExpanded = true;

        let $self = this;
        this.dropdownArrow.addEventListener("click", function() {$self.checkState();});
    }

    checkState()
    {
        if (this.isExpanded)
        {
            this.collapse(this.cards);
        }
        else
        {
            this.expand(this.cards);
        }
    }
    
    collapse(cardElements)
    {
        this.isExpanded = false;

        // Hide all cards inside the box.
        cardElements.forEach(card =>
        {
            gsap.set(card.element, {display: 'none'});
        });
        
        gsap.to(this.dropdownArrow, {duration: 0.5, rotationZ: 0, ease: 'power3.out'});
        gsap.set(this.headerBox, {borderBottomRightRadius: '1.9em', borderBottomLeftRadius: '1.9em'});
        gsap.set(this.boxContent, {padding: '0em'});
    }

    expand(cardElements)
    {
        this.isExpanded = true;

        // Display all cards inside the box.
        cardElements.forEach(card =>
        {
            gsap.set(card.element, {display: 'block'});
        });

        gsap.to(this.dropdownArrow, {duration: 0.5, rotationZ: 180, ease: 'power3.out'});
        gsap.set(this.headerBox, {borderBottomRightRadius: '0em', borderBottomLeftRadius: '0em'});
        gsap.set(this.boxContent, {padding: '4em'});
    }
}

let statusCodeCards1XX = [];
let statusCodeCards2XX = [];
let statusCodeCards3XX = [];
let statusCodeCards4XX = [];
let statusCodeCards5XX = [];
const informationalGroup = new StatusCodeGroup(".Informational-Codes", statusCodeCards1XX, 1);
const successGroup = new StatusCodeGroup(".Success-Codes", statusCodeCards2XX, 2);
const redirectionGroup = new StatusCodeGroup(".Redirection-Codes", statusCodeCards3XX, 3);
const clientGroup = new StatusCodeGroup(".Client-Codes", statusCodeCards4XX, 4);
const serverGroup = new StatusCodeGroup(".Server-Codes", statusCodeCards5XX, 5);

//#region Hypertext Transfer Protocol (HTTP) response status codes
//#region 1XX: Informational Codes
const informationalCodes = [
    // 100: Continue
    {
        codeNumber: 100,
        codeName: "Continue",
        codeDesc: "The server has received the request headers, and the client should proceed to send the request body."
    },
    // 101: Continue
    {
        codeNumber: 101,
        codeName: "Switching Protocols",
        codeDesc: "The requester has asked the server to change protocols using a protocol upgrade mechanism, and the server has agreed."
    },
    // 102: Continue
    {
        codeNumber: 102,
        codeName: "Processing",
        codeDesc: "The server has accepted the entire request but is still processing it."
    },
    // 103: Early Hints
    {
        codeNumber: 103,
        codeName: "Early Hints",
        codeDesc: "Use it with the Link header to preload resources while the server prepares a response."
    },
];
//#endregion

//#region 2XX: Success Codes
const successCodes = [
    // 200: OK
    {
        codeNumber: 200,
        codeName: "OK",
        codeDesc: "The request succeeded."
    },
    // 201: Created
    {
        codeNumber: 201,
        codeName: "Created",
        codeDesc: "The server acknowledged a newly created resource."
    },
    // 202: Accepted
    {
        codeNumber: 202,
        codeName: "Accepted",
        codeDesc: "The server has received the client's request but is still processing it."
    },
    // 203: Non-Authoritative Information
    {
        codeNumber: 203,
        codeName: "Non-Authoritative Information",
        codeDesc: "The server's response to the client differs from the initial response that the server sent."
    },
    // 204: No Content
    {
        codeNumber: 204,
        codeName: "No Content",
        codeDesc: "The server has processed the request but isn't returning any content."
    },
    // 205: Reset Content
    {
        codeNumber: 205,
        codeName: "Reset Content",
        codeDesc: "The client should refresh the document sample."
    },
    // 206: Partial Content
    {
        codeNumber: 206,
        codeName: "Partial Content",
        codeDesc: "The server is sending only part of the resource."
    },
    // 207: Multi-Status
    {
        codeNumber: 207,
        codeName: "Multi-Status",
        codeDesc: "The server response may contain multiple response codes."
    },
    // 208: Already Reported
    {
        codeNumber: 208,
        codeName: "Already Reported",
        codeDesc: "The server response highlights duplicate internal contents with this status code."
    },
    // 226: IM Used
    {
        codeNumber: 226,
        codeName: "IM Used",
        codeDesc: "IM stands for instance manipulation. The server has fulfilled a GET request, and the server response involves IMs."
    },
];
//#endregion

//#region 3XX: Redirection Codes
const redirectionCodes = [
    // 300: Multiple Choices
    {
        codeNumber: 300,
        codeName: "Multiple Choices",
        codeDesc: "The client must choose among several possible responses for the server request."
    },
    // 301: Moved Permanently
    {
        codeNumber: 301,
        codeName: "Moved Permanently",
        codeDesc: "The server tells the client the requested resource is now at another URI permanently."
    },
    // 302: Found
    {
        codeNumber: 302,
        codeName: "Found",
        codeDesc: "The server tells the client that the requested resource is temporarily at another URI."
    },
    // 303: See Other
    {
        codeNumber: 303,
        codeName: "See Other",
        codeDesc: "The server doesn't redirect the client to the requested resource but to another page."
    },
    // 304: Not Modified
    {
        codeNumber: 304,
        codeName: "Not Modified",
        codeDesc: "The server response is the same as in the past, so the client can continue to use the client's cached version of the server response."
    },
    // 305: Use Proxy
    {
        codeNumber: 305,
        codeName: "Use Proxy",
        codeDesc: "The client could only access the requested resource through a proxy given in the response. The response code is deprecated due to security concerns."
    },
    // 306: Switch Proxy
    {
        codeNumber: 306,
        codeName: "Switch Proxy",
        codeDesc: "The response code is no longer in use. It was used to inform the client that the subsequent requests should use the specified proxy."
    },
    // 307: Temporary Redirect
    {
        codeNumber: 307,
        codeName: "Temporary Redirect",
        codeDesc: "The response code gets sent by the server in order to direct the client to the requested resource at another URI. The request method, however, must not be changed."
    },
    // 308: Permanent Redirect
    {
        codeNumber: 308,
        codeName: "Permanent Redirect",
        codeDesc: "The requested resource has been permanently assigned a new URI, and future references to the resource should be made by using one of the enclosed URIs."
    }
];
//#endregion

//#region 4XX: Client Codes
const clientCodes = [
    // 400: Bad Request
    {
        codeNumber: 400,
        codeName: "Bad Request",
        codeDesc: "The client has sent a request with incomplete, ill-constructed, or invalid data."
    },
    // 401: Unauthorized
    {
        codeNumber: 401,
        codeName: "Unauthorized",
        codeDesc: "The client lacks the authorization needed to access the requested resource."
    },
    // 402: Payment Required
    {
        codeNumber: 402,
        codeName: "Payment Required",
        codeDesc: "A rare status code reserved for digital payment systems."
    },
    // 403: Forbidden
    {
        codeNumber: 403,
        codeName: "Forbidden",
        codeDesc: "The server prohibits the client from accessing the resource."
    },
    // 404: Not Found
    {
        codeNumber: 404,
        codeName: "Not Found",
        codeDesc: "This code denotes a nonexistent resource on a working server."
    },
    // 405: Method Not Allowed
    {
        codeNumber: 405,
        codeName: "Method Not Allowed",
        codeDesc: "The server has received and recognized the request but has rejected the specific request method."
    },
    // 406: Not Acceptable
    {
        codeNumber: 406,
        codeName: "Not Acceptable",
        codeDesc: "The website or web application doesn't support the client's request with a particular protocol."
    },
    // 407: Proxy Authentication Required
    {
        codeNumber: 407,
        codeName: "Proxy Authentication Required",
        codeDesc: "Similar to 401 Unauthorized, but the server requires authorization via a proxy."
    },
    // 408: Request Timeout
    {
        codeNumber: 408,
        codeName: "Request Timeout",
        codeDesc: "The request the client sent to the server has expired."
    },
    // 409: Conflict
    {
        codeNumber: 409,
        codeName: "Conflict",
        codeDesc: "The request transmitted conflicts with the server's internal operations."
    },
    // 410: Gone
    {
        codeNumber: 410,
        codeName: "Gone",
        codeDesc: "The resource sought by the client is permanently unavailable."
    },
    // 411: Length Required
    {
        codeNumber: 411,
        codeName: "Length Required",
        codeDesc: "The server requires the Content-Length header field, but it was missing in the request, so the server rejected it."
    },
    // 412: Precondition Failed
    {
        codeNumber: 412,
        codeName: "Precondition Failed",
        codeDesc: "The server does not meet the conditions indicated by the client."
    },
    // 413: Payload Too Large
    {
        codeNumber: 413,
        codeName: "Payload Too Large",
        codeDesc: "Request entity exceeds server limits."
    },
    // 414: URI Too Long
    {
        codeNumber: 414,
        codeName: "URI Too Long",
        codeDesc: "The URI requested by the client is longer than the server is willing to interpret."
    },
    // 415: Unsupported Media Type
    {
        codeNumber: 415,
        codeName: "Unsupported Media Type",
        codeDesc: "The server doesn't support the media format of the requested data and thus rejects the request."
    },
    // 416: Requested Range Not Satisfiable
    {
        codeNumber: 416,
        codeName: "Requested Range Not Satisfiable",
        codeDesc: "The server response cannot fulfill the range specified by the Range header field in the request."
    },
    // 417: Expectation Failed
    {
        codeNumber: 417,
        codeName: "Expectation Failed",
        codeDesc: "The server cannot meet the expectation indicated by the Expect request header field."
    },
    // 418: I'm a teapot
    {
        codeNumber: 418,
        codeName: "I'm a teapot",
        codeDesc: "The server sends this response to undesirable requests, such as automated queries."
    },
    // 421: Misdirected Request
    {
        codeNumber: 421,
        codeName: "Misdirected Request",
        codeDesc: "The request went to a server unable to produce a response."
    },
    // 422: Unprocessable Entity
    {
        codeNumber: 422,
        codeName: "Unprocessable Entity",
        codeDesc: "Semantic errors in the request prevented the server from sending the expected response."
    },
    // 423: Locked
    {
        codeNumber: 423,
        codeName: "Locked",
        codeDesc: "The requested resource is locked."
    },
    // 424: Failed Dependency
    {
        codeNumber: 424,
        codeName: "Failed Dependency",
        codeDesc: "The failure of a previous request doomed this request to failure."
    },
    // 425: Too Early
    {
        codeNumber: 425,
        codeName: "Too Early",
        codeDesc: "The server aborted a request that might be part of an (intentional or unintentional) replay attack."
    },
    // 426: Upgrade Required
    {
        codeNumber: 426,
        codeName: "Upgrade Required",
        codeDesc: "The server would only perform the request after the client upgrades to one or more different protocols specified in its Upgrade header."
    },
    // 428: Precondition Required
    {
        codeNumber: 428,
        codeName: "Precondition Required",
        codeDesc: "The origin server requires the request to satisfy certain conditions."
    },
    // 429: Too Many Requests
    {
        codeNumber: 429,
        codeName: "Too Many Requests",
        codeDesc: "The client has sent too many requests in a given amount of time."
    },
    // 431: Request Header Fields Too Large
    {
        codeNumber: 431,
        codeName: "Request Header Fields Too Large",
        codeDesc: "The server is unwilling to process the request because of oversized header fields."
    },
    // 451: Unavailable for Legal Reasons
    {
        codeNumber: 451,
        codeName: "Unavailable for Legal Reasons",
        codeDesc: "The server cannot legally provide the requested resource, such as a government-censored page."
    }
];
//#endregion

//#region 5XX: Server Codes
const serverCodes = [
    // 500: Internal Server Error
    {
        codeNumber: 500,
        codeName: "Internal Server Error",
        codeDesc: "The server has run into problems while processing the client's request."
    },
    // 501: Not Implemented
    {
        codeNumber: 501,
        codeName: "Not Implemented",
        codeDesc: "The server can't resolve the client's HTTP request method."
    },
    // 502: Bad Gateway
    {
        codeNumber: 502,
        codeName: "Bad Gateway",
        codeDesc: "The server, acting as a gateway or proxy, received an invalid message from an inbound server."
    },
    // 503: Service Unavailable
    {
        codeNumber: 503,
        codeName: "Service Unavailable",
        codeDesc: "The server appears non-functional and can't process the client's request."
    },
    // 504: Gateway Timeout
    {
        codeNumber: 504,
        codeName: "Gateway Timeout",
        codeDesc: "The server, acting as a gateway, fails to produce a response in time."
    },
    // 505: HTTP Version Not Supported
    {
        codeNumber: 505,
        codeName: "HTTP Version Not Supported",
        codeDesc: "The server doesn't support the HTTP version used in the request."
    },
    // 506: Variant Also Negotiates
    {
        codeNumber: 506,
        codeName: "Variant Also Negotiates",
        codeDesc: "The server has an internal configuration error that leads to content conflicts."
    },
    // 507: Insufficient Storage
    {
        codeNumber: 507,
        codeName: "Insufficient Storage",
        codeDesc: "The server doesn't have enough storage to perform the HTTP method of the request."
    },
    // 508: Loop Detected
    {
        codeNumber: 508,
        codeName: "Loop Detected",
        codeDesc: "The server detected an infinite loop while processing the request."
    },
    // 510: Not Extended
    {
        codeNumber: 510,
        codeName: "Not Extended",
        codeDesc: "The server requires further extensions to the request before fulfilling it."
    },
    // 511: Network Authentication Required
    {
        codeNumber: 511,
        codeName: "Network Authentication Required",
        codeDesc: "The client needs to get authenticated on the network to access the resource."
    }
];
//#endregion
//#endregion

const statusCodeParams = 
[
    // 1XX: Informational
    {
        codes: informationalCodes,
        boxContent: informationalGroup.boxContent,
        cards: statusCodeCards1XX,
        color: "text-informational",
        bgColor: "bg-informational",
        dropShadowColor: "drop-shadow-1XX"
    },
    // 2XX: Success
    {
        codes: successCodes,
        boxContent: successGroup.boxContent,
        cards: statusCodeCards2XX,
        color: "text-success",
        bgColor: "bg-success",
        dropShadowColor: "drop-shadow-2XX"
    },
    // 3XX: Redirection
    {
        codes: redirectionCodes,
        boxContent: redirectionGroup.boxContent,
        cards: statusCodeCards3XX,
        color: "text-redirection",
        bgColor: "bg-redirection",
        dropShadowColor: "drop-shadow-3XX"
    },
    // 4XX: Client
    {
        codes: clientCodes,
        boxContent: clientGroup.boxContent,
        cards: statusCodeCards4XX,
        color: "text-client",
        bgColor: "bg-client",
        dropShadowColor: "drop-shadow-4XX"
    },
    // 5XX: Server
    {
        codes: serverCodes,
        boxContent: serverGroup.boxContent,
        cards: statusCodeCards5XX,
        color: "text-server",
        bgColor: "bg-server",
        dropShadowColor: "drop-shadow-5XX"
    }
];

Main();

//#region Main Function(s)
function Main()
{
    for (var i = 0; i < statusCodeParams.length; i++)
    {
        addStatusCodes(statusCodeParams[i]);
    }
}

function addStatusCodes(statusCodeParameters)
{
    statusCodeParameters.codes.forEach(code =>
    {
        const cardElement = document.createElement("div");
        cardElement.className = `Status-Code-Card-${code.codeNumber} Card relative w-[22em] min-w-[22em] h-[22em] min-h-[22em]`;

        cardElement.innerHTML =
        `
            <!-- Status Code Card (Front) -->
            <div class="Card-Front absolute top-0 left-0 p-[1.5em]
            flex flex-col justify-between items-center 
            bg-white w-full h-full rounded-[3em] ${statusCodeParameters.dropShadowColor}">
                <p class="Code-Number
                text-[8em] text-center ${statusCodeParameters.color} font-Nunito-B">
                ${code.codeNumber}
                </p>
                <p class="Code-Name min-h-[8em]
                text-[1.5em] text-center text-dark font-Nunito-B">
                ${code.codeName}
                </p>
            </div>

            <!-- Status Code Card (Back) -->
            <div class="Card-Back absolute top-0 left-0 p-[2em]
            flex flex-col justify-center items-center
            ${statusCodeParameters.bgColor} w-full h-full rounded-[3em] ${statusCodeParameters.dropShadowColor}">
                <div class="Bolts">
                    <div class="Bolt-TR absolute
                    bg-white top-[7.5%] right-[7.5%] size-[0.8em] rounded-circular">
                    </div>
                    <div class="Bolt-TL absolute
                    bg-white top-[7.5%] left-[7.5%] size-[0.8em] rounded-circular">
                    </div>
                    <div class="Bolt-BR absolute
                    bg-white bottom-[7.5%] right-[7.5%] size-[0.8em] rounded-circular">
                    </div>
                    <div class="Bolt-BR absolute
                    bg-white bottom-[7.5%] left-[7.5%] size-[0.8em] rounded-circular">
                    </div>
                </div>
                <p class="Code-Description
                text-[1.5em] text-center text-white font-Nunito-SB">
                ${code.codeDesc}
                </p>
            </div>
        `;

        statusCodeParameters.boxContent.appendChild(cardElement);
        
        let card = new StatusCodeCard(`.Status-Code-Card-${code.codeNumber}`);
        statusCodeParameters.cards.push(card);
    });
}
//#endregion