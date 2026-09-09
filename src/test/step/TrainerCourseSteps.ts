import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { customworld } from "../world/customWorld";
import { readCsvData } from "../Utils/csvReader";
import trainerLoginData from '../testdata/trainerLogin.json';

export interface ParticipantData {
    ValidParticipant: string;
    InvalidParticipant: string;
}
const participantData =
    readCsvData<ParticipantData>("InviteParticipantData.csv");

function getParticipantData(): ParticipantData {

    const data = participantData[0];

    if (!data) {
        throw new Error(
            "Participant data not found in InviteParticipantData.csv"
        );
    }

    return data;
}


Given(
    "the trainer is on the login page",
    async function (this: customworld) {

        await this.trainerLogin.launch();
    }
);


When(
    "the trainer enters valid credentials",
    async function (this: customworld) {

        await this.trainerLogin.switchToTrainer();
        await this.trainerLogin.EnterUnsername(
            trainerLoginData.validTrainer.email
        );

        await this.trainerLogin.EnterPass(
            trainerLoginData.validTrainer.password
        );
    }
);


When(
    "the trainer clicks on the login button",
    async function (this: customworld) {

        await this.trainerLogin.signClick();
    }
);
When(
    "the trainer clicks My Training Module",
    async function (this: customworld) {

        await this.tcp.clickMyTrainingModule();
    }
);


When(
    "the trainer clicks any course and clicks Invite Participant",
    async function (this: customworld) {

        await this.tcp.clickCourse();

        await this.tcp.clickParticipant();

        await this.tcp.clickInviteParticipant();
    }
);


When(
    "the trainer enters a valid participant name",
    async function (this: customworld) {

        const data = getParticipantData();

        await this.tcp.enterParticipantName(
            data.ValidParticipant
        );
    }
);


Then(
    "only the matching participant should be displayed",
    async function (this: customworld) {

        const data = getParticipantData();

        const allParticipants =
            await this.tcp.getAllParticipants();

        expect(allParticipants.length).toBeGreaterThan(0);

        for (const participant of allParticipants) {

            expect(
                participant.toLowerCase()
            ).toContain(
                data.ValidParticipant.toLowerCase()
            );
        }
    }
);


When(
    "the trainer enters an invalid participant name",
    async function (this: customworld) {

        const data = getParticipantData();

        await this.tcp.enterParticipantName(
            data.InvalidParticipant
        );
    }
);


Then(
    "no matching participant should be displayed",
    async function (this: customworld) {

        const allParticipants =
            await this.tcp.getAllParticipants();

        expect(allParticipants).toHaveLength(0);
    }
);


When(
    "the trainer selects an approved participant",
    async function (this: customworld) {

        await this.tcp.selectApprovedParticipant();
    }
);


When(
    "the trainer clicks Invite Selected Participants",
    async function (this: customworld) {

        await this.tcp.clickInviteSelectedParticipants();
    }
);


Then(
    "the participant should be added successfully",
    async function (this: customworld) {

        await this.tcp.verifyParticipantAddedSuccessfully();
    }
);


Then(
    "the Invite Selected Participants button should not be enabled",
    async function (this: customworld) {

        await this.tcp.verifyInviteSelectedParticipantsDisabled();
    }
);


When(
    "the trainer clicks the Refresh button",
    async function (this: customworld) {

        await this.tcp.clickRefresh();
    }
);


Then(
    "the participant list should be refreshed successfully",
    async function (this: customworld) {

        await this.tcp.verifyParticipantListRefreshed();
    }
);