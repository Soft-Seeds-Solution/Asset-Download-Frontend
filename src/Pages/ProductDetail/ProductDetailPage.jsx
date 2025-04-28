import { useContext, useState } from "react";
import ProductContext from "../../ContextApi/ProductContext";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Image, Modal, Nav, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faClose } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../ContextApi/UserContext";
import MembershipContext from "../../ContextApi/MembershipContext";
import apiUrl from "../../ApiEndpoint";
import Swal from "sweetalert2";

export default function ProductDetailPage() {
    const [stopLeft, setStopLeft] = useState("")
    const [screenShotPreview, setScreenShotPreview] = useState("");
    const [openModal, setOpenModal] = useState(false)
    const [screenInd, setScreenInd] = useState("")
    const { products, productViewsFn } = useContext(ProductContext);
    const { signUser } = useContext(UserContext)
    const { allMembers, allMembersFn } = useContext(MembershipContext)
    const { title } = useParams()
    const productTitle = title?.replace(/-/g, " ")
    const filterProduct = products?.find(productData => productData.title === productTitle)
    const findUserMembershipPlan = signUser && [...allMembers]?.find(member => member.userId?._id === signUser?._id && member.status === "true" && member.dailyLimit !== member.todayDownloads)
    const IsActiveMembershipPlan = signUser && [...allMembers]?.find(member => member.userId?._id === signUser?._id && member.status === "true")

    const openModalViewScreenshot = (ind) => {
        if (ind !== 0 && !ind) {
            setScreenShotPreview(filterProduct?.youtubeLink)
            setOpenModal(true)
        } else {
            setScreenInd(ind)
            setScreenShotPreview(filterProduct?.screenshots[ind])
            setOpenModal(true)
            setStopLeft(true)
        }
    }
    const handleClose = () => {
        setOpenModal(false)
        setScreenInd("")
    }
    const moveLeft = () => {
        if (screenInd === 0) {
            setScreenInd("")
            setStopLeft(false)
            setScreenShotPreview(filterProduct?.youtubeLink)
        } else {
            setScreenInd(screenInd - 1)
            setScreenShotPreview(filterProduct?.screenshots[screenInd - 1])
        }
    }
    const moveRight = () => {
        setStopLeft(true)
        if (screenInd === "") {
            setScreenInd(0)
            setScreenShotPreview(filterProduct?.screenshots[0])
        } else {
            setScreenInd(screenInd + 1)
            setScreenShotPreview(filterProduct?.screenshots[screenInd + 1])
        }
    }

    const downloadFn = async (url, title, id) => {
        if (!signUser?.name) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Please Sign In First",
                showConfirmButton: true,
            });
            return;
        }
        if (signUser?.role && IsActiveMembershipPlan) {
            if (!findUserMembershipPlan) {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Daily Unique Asset Download Limit Reached",
                    showConfirmButton: true,
                });
                return;
            }
            try {
                const res = await fetch(`${apiUrl}/api/subscribe/updateDailyDownload/${findUserMembershipPlan?._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ assetTitle: title })
                });

                const data = await res.json();

                if (!res.ok) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: data.message || "Download not allowed",
                        showConfirmButton: true,
                    });
                    return;
                }

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                await fetch(`${apiUrl}/api/product/updateProductDownloads/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" }
                });
                allMembersFn()
            } catch (err) {
                console.error("Download error:", err);
                Swal.fire({
                    icon: "error",
                    title: "Download Failed",
                    text: "Something went wrong while downloading.",
                });
            }
        } else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You need to subscribe plan first",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="text-white">
            <Container>
                {filterProduct && (
                    <>
                        <Row className="py-4">
                            <Col md={7}>
                                <Image className="mb-3" src={filterProduct.featureImg} style={{ width: "100%", height: "410px", borderRadius: "10px", border: "0.5px solid var(--border)" }}></Image>
                                <div className="d-flex" >
                                    {filterProduct.screenshots?.map((screenshot, ind) => (
                                        <Image className="me-3" key={ind} src={screenshot} style={{ width: "93px", height: "93px", borderRadius: "10px", border: "0.5px solid var(--border)" }} onClick={() => openModalViewScreenshot(ind, false)}></Image>
                                    ))}
                                </div>
                            </Col>
                            <Col md={5}>
                                <div style={{ backgroundColor: "var(--light-bg)", borderRadius: "15px", border: "0.5px solid var(--border)" }} className="p-4">
                                    <h4>{filterProduct.title}</h4>
                                    <div className="mt-3">
                                        <h6 style={{ fontSize: "18px" }}>Category : <span style={{ fontWeight: "lighter", fontSize: "15px" }}>{filterProduct.categoryId?.category}</span></h6>
                                        <h6 style={{ fontSize: "18px" }}>Sub Category : <span style={{ fontWeight: "lighter", fontSize: "15px" }}>{filterProduct.subCategoryId?.subCategory}</span></h6>
                                    </div>

                                </div>
                                <div style={{ backgroundColor: "var(--light-bg)", borderRadius: "15px", border: "0.5px solid var(--border)" }} className="p-4 mt-3">
                                    {filterProduct.versions?.map((version, ind) => (
                                        <div key={ind} className="mt-3">
                                            {version.version && (
                                                <div>
                                                    <h6>Version : <span style={{ fontWeight: "lighter", fontSize: "15px" }}>{version.version}</span></h6>
                                                </div>
                                            )}
                                            <div>
                                                {version.downloadUrl && (
                                                    <Button as="a" className="me-3 dark-btn" href={`/check-adblock?link=${encodeURIComponent(version.downloadUrl)}`}
                                                        target="_blank" rel="noopener noreferrer">
                                                        Free Download
                                                    </Button>
                                                )}
                                                {version.directUrl && (
                                                    <Button onClick={() => downloadFn(version.directUrl, version.title, version._id)} className="primary-btn">
                                                        Premium Download
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {(filterProduct.sampleUrl && filterProduct.sampleUrl !== "undefined") && (
                                    <div className="d-flex align-items-center mt-4">
                                        <h6 className="me-3">For more details about this asset:</h6>
                                        <Button as="a" target="_blank" rel="noopener noreferrer" className="primary-btn" href={`/check-adblock?link=${encodeURIComponent(filterProduct.sampleUrl)}`}>Click Here</Button>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <h3 className="my-3">Description</h3>
                                <p dangerouslySetInnerHTML={{ __html: filterProduct.description }}></p>
                                <h3 className="my-3">Features</h3>
                                <p dangerouslySetInnerHTML={{ __html: filterProduct.features }}></p>

                            </Col>
                            <Col md={4} className="mt-5">
                                <div className="pt-3 pb-2" style={{ backgroundColor: "var(--light-bg)", borderRadius: "15px", border: "0.5px solid var(--border)" }}>
                                    <div className="d-flex justify-content-center">
                                        {/* <Image src={companyIcon} className="me-3" /> */}
                                        <h5>{filterProduct.authorName}</h5>
                                    </div>
                                    <div className="my-3" style={{ width: "100%", height: "1px", backgroundColor: "var(--border)" }}></div>
                                    <div className="d-flex justify-content-center">
                                        <Button as={Link} to={`/portfolio/${filterProduct.authorName.replace(/\s+/g, "-")}`} className="dark-btn py-2">View Portfolio</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>

            {/* screenshot preview */}
            <Modal
                size="xl"
                show={openModal}
                centered
                contentClassName="transparent-modal"
                backdropClassName="fade-backdrop"
                animation={true}
            >
                <Modal.Body>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            {filterProduct?.youtubeLink ? (
                                <p className=" mb-5" style={{ fontSize: "25px" }}>{screenInd === "" ? 1 : screenInd + 2}/{filterProduct?.screenshots?.length + 1}</p>
                            ) : (
                                <p className=" mb-5 text-white" style={{ fontSize: "25px" }}>{screenInd + 1}/{filterProduct?.screenshots?.length}</p>
                            )}

                            {filterProduct?.youtubeLink ? (
                                !stopLeft ? (
                                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} size="2x" />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} size="2x" onClick={moveLeft} />
                                )
                            ) : (
                                screenInd === 0 ? (
                                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} size="2x" />
                                ) : (
                                    <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} size="2x" onClick={moveLeft} />
                                )
                            )}
                        </div>

                        <Image src={screenShotPreview} style={{ maxWidth: "90%", maxHeight: "90vh", boxShadow: "0 0 4px var(--secondary-color)" }} />

                        <div>
                            <p className=" mb-5" ><FontAwesomeIcon icon={faClose} onClick={handleClose} style={{ color: "white" }} size="2x" /></p>
                            {screenInd === filterProduct?.screenshots?.length - 1 ? (
                                <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} size="2x" />
                            ) : (
                                <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} size="2x" onClick={moveRight} />
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Container className="my-4">
                <h3>Related Products</h3>
                <Row>
                    {products?.filter(product => product.categoryId?.category === filterProduct.categoryId?.category).map((product, ind) => (
                        <Col md={3} key={ind}>
                            <Link to={`/detail-page/${product.title.replace(/\s+/g, "-")}`}>
                                <Card style={{ border: "1px solid white", borderRadius: "10px", backgroundColor: "var(--light-bg)" }} onClick={() => productViewsFn(product._id)}>
                                    <Image src={product.thumbnail} style={{ height: "250px", borderRadius: "10px" }} />
                                    <div>
                                        <h6 className="text-white p-3">{product.title?.length > 28 ? product.title.slice(0, 28) + "..." : product.title}</h6>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div >
    )
}
