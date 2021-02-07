describe('racing-game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500/');
  });

  it('"EAST, WEST, SOUTH, NORTH"를 입력하면 화면에 해당 자동차 이름들을 표시하는 테스트를 한다.', () => {
    const carNames = ['EAST', 'WEST', 'SOUTH', 'NORTH'];

    typeCarNameAndSubmit(carNames);
    cy.get('.car-player')
      .should('have.length', carNames.length)
      .each(($div, index, $lis) => {
        return cy.get($div).should('have.text', carNames[index]);
      });
  });

  it('올바르지 않은 자동차 이름을 입력한 경우 경고메세지를 출력한다.', () => {
    const longCarName = ['YUJOYOONHO'];
    const blankCarName = ['   '];
    const emptyCarName = [''];
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);
    typeCarNameAndSubmit(longCarName).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(
        '이름은 5글자 이하로 입력해 주세요.',
      );
      cy.get('#car-name-input').should('have.text', '');
    });
    typeCarNameAndSubmit(blankCarName).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(
        '공백만으로는 이름을 구성할 수 없습니다.',
      );
      cy.get('#car-name-input').should('have.text', '');
    });
    typeCarNameAndSubmit(emptyCarName).then(() => {
      expect(alertStub.getCall(0)).to.be.calledWith(
        '공백만으로는 이름을 구성할 수 없습니다.',
      );
      cy.get('#car-name-input').should('have.text', '');
    });
  });
});

it('양의 정수만을 시도횟수로 입력할 수 있다.', () => {
  const negativeRacingCount = -7;
  const emptyRacingCount = '';
  const alertStub = cy.stub();

  cy.on('window:alert', alertStub);

  typeRacingCountAndSubmit(negativeRacingCount).then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(
      '1 이상의 숫자를 입력해주세요.',
    );
    cy.get('#racing-count-input').should('have.text', '');
  });

  typeRacingCountAndSubmit(emptyRacingCount).then(() => {
    expect(alertStub.getCall(0)).to.be.calledWith(
      '1 이상의 숫자를 입력해주세요.',
    );
    cy.get('#racing-count-input').should('have.text', '');
  });
});

const typeCarNameAndSubmit = (carName) => {
  cy.get('#car-name-input').type(carNames.join(','));
  cy.get('#car-name-submit').click();
};

const typeRacingCountAndSubmit = (racingCount) => {
  cy.get('#racing-count-input').type(racingCount);
  cy.get('#racing-count-submit').click();
};
