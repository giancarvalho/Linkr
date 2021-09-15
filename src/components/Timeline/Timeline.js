import { PageContainer } from "../_shared/PageContainer";
import { PageTitle } from "../_shared/PageTitle";
import Header from "../Header/Header";
import PublishBox from "./PublishBox";

export default function Timeline() {
    return (
        <PageContainer>
            <Header />
            <PageTitle>
                timeline
            </PageTitle>
            <PublishBox />
        </PageContainer>
    );
}