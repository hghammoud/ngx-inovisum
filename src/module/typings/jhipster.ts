// Generated using typescript-generator version 1.27.339 on 2017-08-26 21:06:49.
/* tslint:disable */
// Generated using typescript-generator version 1.27.339 on 2017-09-18 01:16:50.

// Generated using typescript-generator version 1.27.339 on 2017-12-03 09:00:52.

export interface AbstractAuditingEntity extends Serializable {
}

export interface Asset extends AbstractAuditingEntity, Serializable {
    id?: string;
    name?: string;
    isin?: string;
    type?: string;
    tracker?: string;
    market?: string;
    currency?: string;
    euronextCode?: string;
    morningstarCode?: string;
    quantalysCode?: string;
    quantalysUrl?: string;
    value?: number;
    performance?: { [index: string]: number };
    vl?: { [index: string]: number };
    ytd?: string;
    performanceOneDay?: string;
    performanceOneMonth?: string;
    performanceSixMonths?: string;
    performanceOneYear?: string;
    performanceThreeYears?: string;
    performanceFiveYears?: string;
    performanceTenYears?: string;
    maxLossOneYear?: string;
    maxLossThreeYears?: string;
    maxLossFiveYears?: string;
    maxLossTenYears?: string;
}

export interface AssetAllocation extends AbstractAuditingEntity, Serializable {
    id?: string;
    percentage?: number;
    asset?: Asset;
}

export interface Authority extends Serializable {
    name?: string;
}

export interface PersistentAuditEvent extends Serializable {
    id?: string;
    principal?: string;
    auditEventDate?: Instant;
    auditEventType?: string;
    data?: { [index: string]: string };
}

export interface Portfolio extends AbstractAuditingEntity, Serializable {
    id?: string;
    name?: string;
    allocations?: AssetAllocation[];
}

export interface SocialUserConnection extends Serializable {
    id?: string;
    userId?: string;
    providerId?: string;
    providerUserId?: string;
    rank?: number;
    displayName?: string;
    profileURL?: string;
    imageURL?: string;
    accessToken?: string;
    secret?: string;
    refreshToken?: string;
    expireTime?: number;
}

export interface User extends AbstractAuditingEntity, Serializable {
    id?: string;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    imageUrl?: string;
    resetDate?: Instant;
}

export interface UserDTO {
    id?: string;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    imageUrl?: string;
    activated?: boolean;
    langKey?: string;
    createdBy?: string;
    createdDate?: Instant;
    lastModifiedBy?: string;
    lastModifiedDate?: Instant;
    authorities?: string[];
}

export interface Serializable {
}

export interface Instant extends Temporal, TemporalAdjuster, Comparable<Instant>, Serializable {
    epochSecond?: number;
    nano?: number;
}

export interface Temporal extends TemporalAccessor {
}

export interface TemporalAdjuster {
}

export interface TemporalAccessor {
}

export interface Comparable<T> {
}
